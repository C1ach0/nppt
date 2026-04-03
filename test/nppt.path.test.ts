import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getAdjacentPresentationPath,
  getLocalPath,
  getPresentationRoutePaths,
  getSharedPath,
} from '../src/runtime/nppt.path'

describe('nppt.path', () => {
  beforeEach(() => {
    vi.stubGlobal('window', {
      location: {
        origin: 'https://example.test',
      },
    })
  })

  it('removes the role query from shared paths', () => {
    expect(getSharedPath('/blog?role=viewer')).toBe('/blog')
    expect(getSharedPath('/about?foo=1&role=presenter#team')).toBe('/about?foo=1#team')
  })

  it('adds or removes the local role query correctly', () => {
    expect(getLocalPath('/blog?foo=1', 'viewer')).toBe('/blog?foo=1&role=viewer')
    expect(getLocalPath('/blog?foo=1&role=viewer', 'presenter')).toBe('/blog?foo=1&role=presenter')
    expect(getLocalPath('/blog?foo=1&role=viewer', 'inactive')).toBe('/blog?foo=1')
  })

  it('filters and sorts presentation route paths', () => {
    expect(getPresentationRoutePaths([
      '/blog',
      '/about',
      '/',
      '/blog?role=viewer',
      '/__nuxt_error',
      '/posts/:slug',
      '/contact',
    ])).toEqual([
      '/',
      '/about',
      '/blog',
      '/contact',
    ])
  })

  it('returns the adjacent presentation route', () => {
    const paths = ['/', '/article', '/blog', '/about', '/contact']

    expect(getAdjacentPresentationPath('/article?role=viewer', paths, 'next')).toBe('/blog')
    expect(getAdjacentPresentationPath('/article?role=viewer', paths, 'prev')).toBe('/about')
    expect(getAdjacentPresentationPath('/contact', paths, 'next')).toBeNull()
  })
})
