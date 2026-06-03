"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Heart, Sparkles, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StarrySky } from "@/components/starry-sky"
import { FallingPetals } from "@/components/falling-petals"
import { EnvelopeCard } from "@/components/envelope-card"
import { TypeWriter } from "@/components/type-writer"
import { parseCardFromHash } from "@/lib/codec"
import { getTheme } from "@/lib/themes"
import type { CardData } from "@/lib/types"
import { DEFAULT_CARD_DATA } from "@/lib/types"

type Phase = "sealed" | "opening" | "revealed"

const i18n = {
  en: {
    loading: "Loading...",
    tapToOpen: "Tap to open",
    greeting: (name: string) => `${name}, someone sent you a Qixi blessing`,
    cta: "I want to make one too",
    errorTitle: "No card found",
    errorMsg: "The link seems incomplete or invalid. Try asking the sender for a new link.",
    goCreate: "Create my own card",
  },
  zh: {
    loading: "加载中...",
    tapToOpen: "点击打开",
    greeting: (name: string) => `${name}，有人给你送了一份七夕祝福`,
    cta: "我也要送一份",
    errorTitle: "未找到贺卡",
    errorMsg: "链接似乎不完整或无效，试试让对方重新生成一个。",
    goCreate: "自己做一张",
  },
}

function detectLang(): "en" | "zh" {
  if (typeof navigator === "undefined") return "zh"
  return navigator.language.startsWith("zh") ? "zh" : "en"
}

export default function ReceivePage() {
  const [cardData, setCardData] = useState<CardData>(DEFAULT_CARD_DATA)
  const [phase, setPhase] = useState<Phase>("sealed")
  const [loaded, setLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [lang, setLang] = useState<"en" | "zh">("zh")
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLang(detectLang())
    const data = parseCardFromHash()
    if (data && data.message) {
      setCardData(data)
    } else if (data) {
      setCardData(data)
      if (!data.message && !data.to && !data.from) {
        setHasError(true)
      }
    } else {
      setHasError(true)
    }
    setLoaded(true)
  }, [])

  const handleOpen = useCallback(() => {
    if (phase !== "sealed") return
    setPhase("opening")
    setTimeout(() => setPhase("revealed"), 1200)
  }, [phase])

  const theme = getTheme(cardData.theme)
  const t = i18n[lang]

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900">
        <div className="text-white/50 animate-pulse">{t.loading}</div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="text-center max-w-sm">
          <AlertCircle className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-white/80 mb-2">{t.errorTitle}</h1>
          <p className="text-sm text-white/50 mb-6">{t.errorMsg}</p>
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              {t.goCreate}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-b ${theme.bg}`}>
      {/* Stars always visible, fade in on reveal */}
      <div
        className={`transition-opacity duration-1000 ${
          phase === "sealed" ? "opacity-20" : "opacity-100"
        }`}
      >
        <StarrySky color={theme.star} />
      </div>

      {/* Petals appear on reveal */}
      {phase !== "sealed" && <FallingPetals />}

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-4">
        {phase === "sealed" && (
          <div className="text-center">
            {/* Sealed envelope */}
            <button
              onClick={handleOpen}
              className="group relative cursor-pointer bg-transparent border-none outline-none"
            >
              <div className="relative">
                {/* Envelope body */}
                <div
                  className={`w-72 h-48 bg-gradient-to-br ${theme.envelope} rounded-lg shadow-2xl relative overflow-hidden envelope-body border-2 ${theme.border}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center pt-4">
                    <div className="text-center">
                      <div className="text-4xl mb-2">💌</div>
                      {cardData.to && (
                        <p className={`text-sm ${theme.text} opacity-70`}>
                          {cardData.to}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Envelope flap */}
                <div
                  className={`absolute top-0 left-0 right-0 h-16 bg-gradient-to-b ${theme.envelopeFlap} rounded-t-lg envelope-flap transition-transform duration-500 group-hover:origin-top group-hover:-rotate-x-12`}
                >
                  <div
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-7 h-7 ${theme.accent} rounded-full shadow-lg envelope-seal`}
                  >
                    <Heart className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <p className={`mt-6 text-sm ${theme.textSub} opacity-60 animate-pulse`}>
                {t.tapToOpen}
              </p>
            </button>
          </div>
        )}

        {phase === "opening" && (
          <div className="text-center animate-pulse">
            <Sparkles className="w-16 h-16 text-yellow-300 mx-auto animate-spin" />
          </div>
        )}

        {phase === "revealed" && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full flex flex-col items-center">
            {/* To name */}
            {cardData.to && (
              <div className="mb-4 text-center">
                <TypeWriter
                  text={t.greeting(cardData.to)}
                  delay={300}
                  speed={100}
                  className={`text-lg ${theme.textSub} opacity-80`}
                />
              </div>
            )}

            {/* Card */}
            <div ref={cardRef}>
              <EnvelopeCard data={cardData} animate />
            </div>

            {/* CTA */}
            <div className="mt-8 animate-in fade-in delay-[2000ms] duration-700">
              <Link href="/">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  {t.cta}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
