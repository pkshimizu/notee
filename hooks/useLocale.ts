import { useRouter } from 'next/router'
import ja from '../locales/ja'
import en from '../locales/en'
import { useCallback } from 'react'
import template from 'lodash/template'

export type LabelText = {
  value?: string
  defaultValue?: string
  args?: { [key: string]: string | number }
  plain?: boolean
  truncate?: number
}

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
    ({ value, defaultValue, args, plain = false, truncate }: LabelText) => {
      let translatedText = plain ? value : dict[value ?? defaultValue ?? 'undefined']
      if (translatedText) {
        if (args) {
          translatedText = template(translatedText)(args)
        }
        if (truncate) {
          translatedText =
            translatedText.length <= truncate ? translatedText : translatedText.substr(0, truncate - 3) + '...'
        }
        return translatedText
      }
      if (defaultValue === undefined) {
        console.warn(`Undefined text "${value}"`)
      }
      return value ?? defaultValue ?? 'undefined'
    },
    [dict]
  )

  return {
    t,
  }
}
