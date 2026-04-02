import { reactive } from 'vue'
import type { DebugEntry, NpptAction, NpptDebugState, NpptState, Role } from './nppt.types'

export function createClientId() {
  return `nppt-${Math.random().toString(36).slice(2, 8)}`
}

export function createDebugState(clientId: string, role: Role) {
  return reactive<NpptDebugState>({
    clientId,
    role,
    lastAction: null,
    history: [],
  })
}

export function trackAction(
  debug: NpptDebugState,
  state: NpptState,
  role: Role,
  clientId: string,
  direction: DebugEntry['direction'],
  action: NpptAction,
) {
  const entry: DebugEntry = {
    direction,
    type: action.type,
    from: action.from,
    step: action.type === 'REQUEST_STATE' ? state.step : action.step,
    at: new Date().toISOString(),
  }

  debug.lastAction = entry
  debug.history.unshift(entry)
  debug.history = debug.history.slice(0, 20)

  console.info('[nppt]', {
    role,
    clientId,
    direction,
    action,
    currentStep: state.step,
    currentPath: state.currentPath,
    activeStepCount: state.activeStepCount,
    maxStep: state.maxStep,
  })
}
