import type { NpptKeyword, NpptKeywordSize, NpptKeywordTone, NpptState, Role } from './nppt.types'
import { applyNpptBinding } from './nppt.directive'

function parseStep(value?: string) {
  if (!value) {
    return null
  }

  const parsed = Number(value)
  return Number.isNaN(parsed) ? null : parsed
}

function shouldHideForRole(element: HTMLElement, role: Role) {
  const hideOn = element.dataset.npptHideOn

  if (!hideOn) {
    return false
  }

  return hideOn === role
}

function collectStepElements() {
  hydrateJsonBindings()
  return Array.from(document.querySelectorAll<HTMLElement>('[data-nppt-step]'))
}

function hydrateJsonBindings() {
  const elements = document.querySelectorAll<HTMLElement>('[data-nppt]')

  for (const element of elements) {
    const raw = element.getAttribute('data-nppt')

    if (!raw || raw === '[object Object]') {
      continue
    }

    try {
      const parsed = JSON.parse(raw)
      applyNpptBinding(element, parsed)
    }
    catch {
      // On ignore silencieusement les valeurs invalides pour ne pas casser
      // le rendu si l'attribut contient autre chose qu'un JSON valide.
    }
  }
}

function updateStepMetadata(stepElements: HTMLElement[], state: NpptState) {
  let maxStep = 0

  for (const element of stepElements) {
    const step = parseStep(element.dataset.npptStep)

    if (step !== null) {
      maxStep = Math.max(maxStep, step)
    }
  }

  state.maxStep = maxStep
}

function clearManagedAttributes() {
  const managedElements = document.querySelectorAll<HTMLElement>('[data-nppt-managed="true"]')

  for (const element of managedElements) {
    element.removeAttribute('data-nppt-active')
    element.removeAttribute('data-nppt-visible')
    element.removeAttribute('data-nppt-managed')
    element.removeAttribute('data-nppt-current-role')
    element.removeAttribute('data-nppt-current-step')
    element.classList.remove('nppt-focus-target')
    element.hidden = false
  }
}

function normalizeKeywordTone(value?: string): NpptKeywordTone {
  if (value === 'info' || value === 'success' || value === 'warning' || value === 'danger') {
    return value
  }

  return 'neutral'
}

function normalizeKeywordSize(value?: string): NpptKeywordSize {
  if (value === 'sm' || value === 'lg' || value === 'xl') {
    return value
  }

  return 'md'
}

function parseKeywordToken(token: string) {
  const [label, tone, size] = token.split('|').map((part) => part.trim())

  if (!label) {
    return null
  }

  return {
    label,
    tone: normalizeKeywordTone(tone),
    size: normalizeKeywordSize(size),
  } satisfies NpptKeyword
}

function parseKeywords(value?: string) {
  if (!value) {
    return [] as NpptKeyword[]
  }

  return value
    .split(',')
    .map((token) => parseKeywordToken(token))
    .filter((keyword): keyword is NpptKeyword => keyword !== null)
}

function getElementTitle(element: HTMLElement) {
  return (
    element.dataset.npptTitle
    || element.getAttribute('aria-label')
    || element.querySelector('h1, h2, h3, h4, h5, h6')?.textContent?.trim()
    || element.textContent?.trim()?.slice(0, 120)
    || ''
  )
}

function applyActiveMetadata(element: HTMLElement, state: NpptState) {
  state.activeTitle = getElementTitle(element)
  state.activeNote = element.dataset.npptNote || ''
  state.nextPath = element.dataset.npptNext || null
  state.keywords = parseKeywords(element.dataset.npptKeywords)
}

function resetActiveMetadata(state: NpptState) {
  state.activeTitle = ''
  state.activeNote = ''
  state.nextPath = null
  state.keywords = []
}

export function refreshDomVisibility(state: NpptState, role: Role) {
  clearManagedAttributes()
  resetActiveMetadata(state)

  const stepElements = collectStepElements()
  updateStepMetadata(stepElements, state)

  let activeStepCount = 0

  for (const element of stepElements) {
    const elementStep = parseStep(element.dataset.npptStep)

    if (elementStep === null) {
      continue
    }

    const isActiveStep = elementStep === state.step
    const isHiddenForRole = shouldHideForRole(element, role)

    element.dataset.npptManaged = 'true'
    element.dataset.npptVisible = String(!isHiddenForRole)
    element.dataset.npptCurrentRole = role
    element.dataset.npptCurrentStep = String(state.step)
    element.dataset.npptActive = String(isActiveStep && !isHiddenForRole)

    if (isHiddenForRole) {
      element.hidden = true
      continue
    }

    element.hidden = false

    if (isActiveStep) {
      activeStepCount += 1
      element.classList.add('nppt-focus-target')

      if (activeStepCount === 1) {
        applyActiveMetadata(element, state)
      }
    }
  }

  state.activeStepCount = activeStepCount

  document.body.dataset.npptRole = role
  document.body.dataset.npptStep = String(state.step)
  document.body.dataset.npptHasFocus = String(activeStepCount > 0)
}

export function scrollActiveStepIntoView() {
  const activeElement = document.querySelector<HTMLElement>('.nppt-focus-target')

  if (!activeElement) {
    return
  }

  const rect = activeElement.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const currentScroll = window.scrollY
  const absoluteTop = currentScroll + rect.top
  const elementCenter = absoluteTop + rect.height / 2
  const viewportCenter = viewportHeight / 2
  const desiredScrollTop = elementCenter - viewportCenter
  const maxScrollTop = Math.max(
    document.documentElement.scrollHeight - viewportHeight,
    0,
  )
  const nextScrollTop = Math.min(Math.max(desiredScrollTop, 0), maxScrollTop)
  const distance = Math.abs(nextScrollTop - currentScroll)

  if (distance < 8) {
    return
  }

  window.scrollTo({
    top: nextScrollTop,
    behavior: 'smooth',
  })
}
