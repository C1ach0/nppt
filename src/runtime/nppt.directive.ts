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

function getNpptDataAttributes(value?: NpptBindingValue | null) {
  if (!value) {
    return {}
  }

  const attributes: Record<string, string> = {}

  if (value.step !== undefined) {
    attributes['data-nppt-step'] = String(value.step)
  }

  if (value.title) {
    attributes['data-nppt-title'] = value.title
  }

  if (value.note) {
    attributes['data-nppt-note'] = value.note
  }

  if (value.next) {
    attributes['data-nppt-next'] = value.next
  }

  if (value.hideOn) {
    attributes['data-nppt-hide-on'] = value.hideOn
  }

  const serializedKeywords = serializeKeywords(value.keywords)

  if (serializedKeywords) {
    attributes['data-nppt-keywords'] = serializedKeywords
  }

  return attributes
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
  getSSRProps(binding) {
    return getNpptDataAttributes(binding.value)
  },
}
