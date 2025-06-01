"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Languages, X, Volume2, Copy, ExternalLink } from "lucide-react"

interface PageTranslatorProps {
  isVisible: boolean
  onClose: () => void
  targetLanguage: string
  sourceLang?: string
}

export function PageTranslator({ isVisible, onClose, targetLanguage, sourceLang = "uz" }: PageTranslatorProps) {
  const [translationProgress, setTranslationProgress] = useState(0)
  const [isTranslating, setIsTranslating] = useState(false)
  const [translatedElements, setTranslatedElements] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  useEffect(() => {
    if (isVisible) {
      startTranslation()
    }
  }, [isVisible, targetLanguage])

  const startTranslation = async () => {
    setIsTranslating(true)
    setTranslationProgress(0)

    // Tarjima qilinadigan elementlarni topish
    const elements = document.querySelectorAll("h1, h2, h3, p, span, button, label, [data-translate]")
    setTotalElements(elements.length)

    let translated = 0

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement

      // Elementni tarjima qilish (simulatsiya)
      await new Promise((resolve) => setTimeout(resolve, 50))

      // Tarjima logikasi bu yerda bo'ladi
      await translateElement(element, targetLanguage)

      translated++
      setTranslatedElements(translated)
      setTranslationProgress((translated / elements.length) * 100)
    }

    setIsTranslating(false)
  }

  const translateElement = async (element: HTMLElement, targetLang: string) => {
    // Bu yerda real tarjima API'si ishlatiladi
    // Masalan: Google Translate, Microsoft Translator, etc.

    const originalText = element.textContent?.trim()
    if (!originalText || originalText.length < 2) return

    try {
      // Namuna tarjima (real API o'rniga)
      const translatedText = await mockTranslate(originalText, sourceLang, targetLang)

      // Original matnni saqlash
      if (!element.getAttribute("data-original")) {
        element.setAttribute("data-original", originalText)
      }

      // Tarjima qilingan matnni o'rnatish
      if (element.textContent) {
        element.textContent = translatedText
      }

      // Tarjima qilinganligini belgilash
      element.setAttribute("data-translated", "true")
      element.setAttribute("data-target-lang", targetLang)
    } catch (error) {
      console.error("Translation error for element:", error)
    }
  }

  const mockTranslate = async (text: string, from: string, to: string): Promise<string> => {
    // Bu yerda real tarjima API'si chaqiriladi
    // Hozircha mock funksiya

    const translations: Record<string, Record<string, string>> = {
      Dashboard: {
        en: "Dashboard",
        ru: "Панель управления",
        tr: "Kontrol Paneli",
        ar: "لوحة التحكم",
      },
      Mijozlar: {
        en: "Customers",
        ru: "Клиенты",
        tr: "Müşteriler",
        ar: "العملاء",
      },
      Mahsulotlar: {
        en: "Products",
        ru: "Товары",
        tr: "Ürünler",
        ar: "المنتجات",
      },
      Buyurtmalar: {
        en: "Orders",
        ru: "Заказы",
        tr: "Siparişler",
        ar: "الطلبات",
      },
      Inventar: {
        en: "Inventory",
        ru: "Инвентарь",
        tr: "Envanter",
        ar: "المخزون",
      },
      Hisobotlar: {
        en: "Reports",
        ru: "Отчеты",
        tr: "Raporlar",
        ar: "التقارير",
      },
      Sozlamalar: {
        en: "Settings",
        ru: "Настройки",
        tr: "Ayarlar",
        ar: "الإعدادات",
      },
    }

    return translations[text]?.[to] || text
  }

  const restoreOriginal = () => {
    const translatedElements = document.querySelectorAll('[data-translated="true"]')
    translatedElements.forEach((element) => {
      const original = element.getAttribute("data-original")
      if (original && element.textContent) {
        element.textContent = original
        element.removeAttribute("data-translated")
        element.removeAttribute("data-target-lang")
      }
    })
    onClose()
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 shadow-lg border-2">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Languages className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Sahifa Tarjimasi</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {isTranslating ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Tarjima qilinmoqda...</span>
                <Badge variant="outline">{Math.round(translationProgress)}%</Badge>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${translationProgress}%` }}
                ></div>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                {translatedElements} / {totalElements} element tarjima qilindi
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Tarjima tugallandi!</span>
                <Badge variant="default" className="bg-green-600">
                  ✓ Tayyor
                </Badge>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={restoreOriginal}>
                  Aslini qaytarish
                </Button>
                <Button variant="ghost" size="sm">
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
