import { useRouter } from 'next/router'
import ja from '../locales/ja'
import en from '../locales/en'
import { useCallback } from 'react'
import template from 'lodash/template'

function selectDict(locale?: string): { [key: string]: string } {
  switch (locale) {
    case 'ja':
      return ja
    case 'en':
      return en
    default:
      return ja
  }
}

export const useLocale = () => {
  const { locale } = useRouter()
  const dict = selectDict(locale)
  const t = useCallback(
    (key: string, args?: { [key: string]: string | number }) => {
      const text = dict[key]
      if (!text) {
        console.warn(`Undefined text "${key}"`)
      }
      if (args) {
        return template(text ?? key)(args)
      }
      return text ?? key
    },
    [dict]
  )
  return {
    t,
  }
}
