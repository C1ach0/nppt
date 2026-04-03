import type { Role } from './nppt.types'

export type NpptVisibilityTarget = 'viewer' | 'presenter' | 'any'

export function isPresentationActive(role: Role, isActive: boolean) {
  return isActive && role !== 'inactive'
}

export function matchesPresentationTarget(
  role: Role,
  isActive: boolean,
  target: NpptVisibilityTarget,
) {
  if (!isPresentationActive(role, isActive)) {
    return false
  }

  if (target === 'any') {
    return role === 'viewer' || role === 'presenter'
  }

  return role === target
}
