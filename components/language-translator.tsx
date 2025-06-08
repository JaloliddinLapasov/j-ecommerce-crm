"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} 
from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Languages, Globe, Check } from "lucide-react"

const languages = [
  {
    code: "uz",
    name: "O'zbek",
    nativeName: "O'zbekcha",
    flag: "🇺🇿",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
  {
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    flag: "🇹🇷",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
  },
]

const translations = {
  uz: {
    selectLanguage: "Til tanlang",
    currentLanguage: "Joriy til",
    autoTranslate: "Avtomatik tarjima",
    translatePage: "Sahifani tarjima qilish",
  },
  ru: {
    selectLanguage: "Выберите язык",
    currentLanguage: "Текущий язык",
    autoTranslate: "Автоперевод",
    translatePage: "Перевести страницу",
  },
  en: {
    selectLanguage: "Select Language",
    currentLanguage: "Current Language",
    autoTranslate: "Auto Translate",
    translatePage: "Translate Page",
  },
  tr: {
    selectLanguage: "Dil Seçin",
    currentLanguage: "Mevcut Dil",
    autoTranslate: "Otomatik Çeviri",
    translatePage: "Sayfayı Çevir",
  },
  ar: {
    selectLanguage: "اختر اللغة",
    currentLanguage: "اللغة الحالية",
    autoTranslate: "ترجمة تلقائية",
    translatePage: "ترجمة الصفحة",
  },
}

export function LanguageTranslator() {
  const [currentLanguage, setCurrentLanguage] = useState("uz")
  const [isAutoTranslate, setIsAutoTranslate] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)

  const currentLang = languages.find((lang) => lang.code === currentLanguage)
  const t = translations[currentLanguage as keyof typeof translations]

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    // Bu yerda til o'zgartirish logikasi bo'ladi
    console.log(`Language changed to: ${langCode}`)

    // Sahifani qayta yuklash yoki state yangilash
    if (isAutoTranslate) {
      translatePage(langCode)
    }
  }

  const translatePage = async (targetLang?: string) => {
    setIsTranslating(true)
    const lang = targetLang || currentLanguage

    try {
      // Bu yerda tarjima API'si chaqiriladi
      // Masalan: Google Translate API, Microsoft Translator, yoki boshqa xizmat

      // Namuna tarjima funksiyasi
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulatsiya

      console.log(`Page translated to: ${lang}`)

      // DOM elementlarini tarjima qilish
      translateDOMElements(lang)
    } catch (error) {
      console.error("Translation error:", error)
    } finally {
      setIsTranslating(false)
    }
  }

  const translateDOMElements = (targetLang: string) => {
    // Bu yerda sahifadagi matnlarni tarjima qilish logikasi bo'ladi
    // Masalan, data-translate atributiga ega elementlarni topish va tarjima qilish

    const elementsToTranslate = document.querySelectorAll("[data-translate]")
    elementsToTranslate.forEach((element) => {
      const key = element.getAttribute("data-translate")
      if (key && translations[targetLang as keyof typeof translations]) {
        // Tarjima matnini o'rnatish
        // element.textContent = getTranslation(key, targetLang)
      }
    })
  }

  const toggleAutoTranslate = () => {
    setIsAutoTranslate(!isAutoTranslate)
    if (!isAutoTranslate) {
      translatePage()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Languages className="h-4 w-4" />
          <span className="sr-only">{t.selectLanguage}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="flex items-center justify-between px-2 py-1.5">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">{t.currentLanguage}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {currentLang?.flag} {currentLang?.nativeName}
          </Badge>
        </div>

        <DropdownMenuSeparator />

        <div className="px-2 py-1">
          <div className="flex items-center justify-between">
            <span className="text-sm">{t.autoTranslate}</span>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={toggleAutoTranslate}>
              {isAutoTranslate ? (
                <Check className="h-3 w-3 text-green-600" />
              ) : (
                <div className="h-3 w-3 border border-muted-foreground rounded-sm" />
              )}
            </Button>
          </div>
        </div>

        <DropdownMenuSeparator />

        <div className="max-h-48 overflow-y-auto">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{language.flag}</span>
                <div>
                  <div className="text-sm font-medium">{language.nativeName}</div>
                  <div className="text-xs text-muted-foreground">{language.name}</div>
                </div>
              </div>
              {currentLanguage === language.code && <Check className="h-4 w-4 text-green-600" />}
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => translatePage()}
          disabled={isTranslating}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Languages className="h-4 w-4" />
          <span className="text-sm">{isTranslating ? "Tarjima qilinmoqda..." : t.translatePage}</span>
          {isTranslating && (
            <div className="ml-auto">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
            </div>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
