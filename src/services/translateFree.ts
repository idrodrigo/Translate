import { type FromLanguage, type Language } from '../types'

export async function translateFree ({
  fromLanguage,
  toLanguage,
  fromText
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
}) {
  if (fromLanguage === toLanguage) return fromText

  const fromCode = fromLanguage
  const toCode = toLanguage

  const controller = new AbortController()
  const signal = controller.signal

  const res = await fetch('https://translate.terraprint.co/translate', {
    method: 'POST',
    body: JSON.stringify({
      q: fromText,
      source: fromCode,
      target: toCode,
      format: 'text'
    }),
    headers: { 'Content-Type': 'application/json' },
    signal
  })

  const { translatedText } = await res.json()

  return translatedText
}
