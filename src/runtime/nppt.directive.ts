import type { ObjectDirective } from 'vue'
import type { NpptKeyword, NpptKeywordSize, NpptKeywordTone, Role } from './nppt.types'

type NpptBindingValue = {
  step?: number
  title?: string
  note?: string
  next?: string
  hideOn?: Exclude<Role, 'inactive'>
  keywords?: string | NpptKeywordBinding[]
}

type NpptKeywordBinding = {
  label: string
  tone?: NpptKeywordTone
  size?: NpptKeywordSize
}

function serializeKeyword(keyword: NpptKeywordBinding | NpptKeyword) {
  const tone = keyword.tone || 'neutral'
  const size = keyword.size || 'md'
  return `${keyword.label}|${tone}|${size}`
}

function serializeKeywords(value?: NpptBindingValue['keywords']) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return value.map(serializeKeyword).join(',')
}

function setOptionalDataAttribute(element: HTMLElement, key: string, value?: string | number | null) {
  if (value === undefined || value === null || value === '') {
    delete element.dataset[key]
    return
  }

  element.dataset[key] = String(value)
}

export function applyNpptBinding(element: HTMLElement, value?: NpptBindingValue | null) {
  if (!value) {
    return
  }

  setOptionalDataAttribute(element, 'npptStep', value.step)
  setOptionalDataAttribute(element, 'npptTitle', value.title)
  setOptionalDataAttribute(element, 'npptNote', value.note)
  setOptionalDataAttribute(element, 'npptNext', value.next)
  setOptionalDataAttribute(element, 'npptHideOn', value.hideOn)
  setOptionalDataAttribute(element, 'npptKeywords', serializeKeywords(value.keywords))
}

export const npptDirective: ObjectDirective<HTMLElement, NpptBindingValue> = {
  mounted(element, binding) {
    applyNpptBinding(element, binding.value)
  },
  updated(element, binding) {
    applyNpptBinding(element, binding.value)
  },
}
