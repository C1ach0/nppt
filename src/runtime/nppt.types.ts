export type Role = 'presenter' | 'viewer' | 'inactive'

export type NpptAction =
  | {
      type: 'SET_STEP'
      step: number
      from: string
    }
  | {
      type: 'NAVIGATE'
      to: string
      step: number
      from: string
    }
  | {
      type: 'REQUEST_STATE'
      from: string
    }

export type OutgoingAction =
  | {
      type: 'SET_STEP'
      step: number
    }
  | {
      type: 'NAVIGATE'
      to: string
      step: number
    }
  | {
      type: 'REQUEST_STATE'
    }

export type DebugEntry = {
  direction: 'send' | 'receive'
  type: NpptAction['type']
  from: string
  step: number
  at: string
}

export type NpptState = {
  step: number
  currentPath: string
  activeStepCount: number
  maxStep: number
  activeTitle: string
  activeNote: string
  nextPath: string | null
  keywords: NpptKeyword[]
}

export type NpptDebugState = {
  clientId: string
  role: Role
  lastAction: DebugEntry | null
  history: DebugEntry[]
}

export type NpptKeywordTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export type NpptKeywordSize = 'sm' | 'md' | 'lg' | 'xl'

export type NpptKeyword = {
  label: string
  tone: NpptKeywordTone
  size: NpptKeywordSize
}
