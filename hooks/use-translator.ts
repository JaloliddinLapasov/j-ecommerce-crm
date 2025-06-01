"use client"

import { useState, useCallback } from "react"

interface TranslatorState {
  currentLanguage: string
  isTranslating: boolean
  autoTranslate: boolean
  translatedPages: Set<string>
}

export function useTranslator() {
  const [state, setState] = useState<TranslatorState>({
    currentLanguage: "uz",
    isTranslating: false,
    autoTranslate: false,
    translatedPages: new Set(),
  })

  const changeLanguage = useCallback((language: string) => {
    setState((prev) => ({
      ...prev,
      currentLanguage: language,
    }))
  }, [])

  const toggleAutoTranslate = useCallback(() => {
    setState((prev) => ({
      ...prev,
      autoTranslate: !prev.autoTranslate,
    }))
  }, [])

  const translatePage = useCallback(
    async (targetLanguage?: string) => {
      const lang = targetLanguage || state.currentLanguage

      setState((prev) => ({ ...prev, isTranslating: true }))

      try {
        // Tarjima logikasi
        await new Promise((resolve) => setTimeout(resolve, 2000))

        setState((prev) => ({
          ...prev,
          isTranslating: false,
          translatedPages: new Set([...prev.translatedPages, window.location.pathname]),
        }))

        return true
      } catch (error) {
        setState((prev) => ({ ...prev, isTranslating: false }))
        return false
      }
    },
    [state.currentLanguage],
  )

  const isPageTranslated = useCallback(
    (path?: string) => {
      const currentPath = path || window.location.pathname
      return state.translatedPages.has(currentPath)
    },
    [state.translatedPages],
  )

  const clearTranslations = useCallback(() => {
    setState((prev) => ({
      ...prev,
      translatedPages: new Set(),
    }))
  }, [])

  return {
    currentLanguage: state.currentLanguage,
    isTranslating: state.isTranslating,
    autoTranslate: state.autoTranslate,
    changeLanguage,
    toggleAutoTranslate,
    translatePage,
    isPageTranslated,
    clearTranslations,
  }
}
