import { describe, expect, it } from 'vitest'
import { isPresentationActive, matchesPresentationTarget } from '../src/runtime/nppt.visibility'

describe('nppt.visibility', () => {
  it('detects when presentation mode is active', () => {
    expect(isPresentationActive('viewer', true)).toBe(true)
    expect(isPresentationActive('presenter', true)).toBe(true)
    expect(isPresentationActive('inactive', false)).toBe(false)
    expect(isPresentationActive('inactive', true)).toBe(false)
  })

  it('matches viewer and presenter targets correctly', () => {
    expect(matchesPresentationTarget('viewer', true, 'viewer')).toBe(true)
    expect(matchesPresentationTarget('viewer', true, 'presenter')).toBe(false)
    expect(matchesPresentationTarget('presenter', true, 'presenter')).toBe(true)
    expect(matchesPresentationTarget('presenter', true, 'viewer')).toBe(false)
  })

  it('matches the any target only during presentation mode', () => {
    expect(matchesPresentationTarget('viewer', true, 'any')).toBe(true)
    expect(matchesPresentationTarget('presenter', true, 'any')).toBe(true)
    expect(matchesPresentationTarget('inactive', false, 'any')).toBe(false)
  })
})
