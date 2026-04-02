import type { Role } from './nppt.types'

function buildPathFromUrl(url: URL) {
  return `${url.pathname}${url.search}${url.hash}`
}

export function getSharedPath(fullPath: string) {
  const url = new URL(fullPath, window.location.origin)
  url.searchParams.delete('role')
  return buildPathFromUrl(url)
}

export function getLocalPath(target: string, role: Role) {
  const url = new URL(target, window.location.origin)

  if (role === 'inactive') {
    url.searchParams.delete('role')
  }
  else {
    url.searchParams.set('role', role)
  }

  return buildPathFromUrl(url)
}

function normalizePathForComparison(path: string) {
  const url = new URL(path, window.location.origin)
  url.searchParams.delete('role')
  return buildPathFromUrl(url)
}

export function getPresentationRoutePaths(paths: string[]) {
  const seen = new Set<string>()
  const orderedPaths: string[] = []

  for (const path of paths) {
    if (!path.startsWith('/')) {
      continue
    }

    if (path.includes(':') || path.includes('*') || path.includes('(')) {
      continue
    }

    if (path.startsWith('/__')) {
      continue
    }

    const normalizedPath = normalizePathForComparison(path)

    if (seen.has(normalizedPath)) {
      continue
    }

    seen.add(normalizedPath)
    orderedPaths.push(normalizedPath)
  }

  return orderedPaths.sort((a, b) => {
    if (a === b) {
      return 0
    }

    if (a === '/') {
      return -1
    }

    if (b === '/') {
      return 1
    }

    return a.localeCompare(b)
  })
}

export function getAdjacentPresentationPath(
  currentPath: string,
  paths: string[],
  direction: 'next' | 'prev',
) {
  const current = normalizePathForComparison(currentPath)
  const routePaths = getPresentationRoutePaths(paths)
  const currentIndex = routePaths.indexOf(current)

  if (currentIndex === -1) {
    return null
  }

  const offset = direction === 'next' ? 1 : -1
  return routePaths[currentIndex + offset] ?? null
}
