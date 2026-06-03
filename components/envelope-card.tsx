"use client"

import { Heart } from "lucide-react"
import type { CardData } from "@/lib/types"
import { getTheme } from "@/lib/themes"

const AVATARS = ["💌", "💕", "🌹", "🦋", "🌙", "✨"]

const FONTS: Record<string, string> = {
  serif: "font-serif",
  rounded: "font-sans",
  handwritten: "font-[var(--font-dancing)]",
}

export function EnvelopeCard({
  data,
  animate = false,
}: {
  data: CardData
  animate?: boolean
}) {
  const theme = getTheme(data.theme)
  const fontClass = FONTS[data.font] ?? "font-serif"
  const avatar = AVATARS[data.avatar] ?? AVATARS[0]

  const toName = data.to || (data.theme === "starry-blue" ? "My Goddess" : "我的女神")
  const fromName = data.from || ""
  const message = data.message || "Happy Qixi Festival"
  const subtitle = data.subtitle || "愿你们的爱情如银河般永恒璀璨"

  return (
    <div className="max-w-2xl w-full relative">
      <div
        className={`bg-gradient-to-br ${theme.envelope} border-2 ${theme.border} shadow-2xl relative overflow-hidden envelope-body`}
      >
        <div
          className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b ${theme.envelopeFlap} envelope-flap`}
        >
          <div
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 ${theme.accent} rounded-full shadow-lg envelope-seal`}
          >
            <Heart className="w-5 h-5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="pt-24 pb-8 px-8 text-center">
          {toName && (
            <p className={`text-sm ${theme.textSub} mb-2 opacity-70`}>
              {avatar} {toName}
            </p>
          )}

          <div className={animate ? "floating-text" : ""}>
            <h1
              className={`text-4xl md:text-6xl font-bold ${theme.text} mb-4 text-balance ${fontClass}`}
            >
              {message}
            </h1>
          </div>

          <p className={`text-lg ${theme.textSub} mb-6 text-pretty leading-relaxed ${fontClass}`}>
            {subtitle}
          </p>

          {fromName && (
            <p className={`text-sm ${theme.textSub} opacity-60 mt-4`}>— {fromName}</p>
          )}
        </div>
      </div>
    </div>
  )
}
