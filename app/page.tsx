"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Settings,
  Upload,
  X,
  Languages,
  Share2,
  Palette,
} from "lucide-react"
import { StarrySky } from "@/components/starry-sky"
import { FallingPetals } from "@/components/falling-petals"
import { EnvelopeCard } from "@/components/envelope-card"
import { ShareDialog } from "@/components/share-dialog"
import type { CardData } from "@/lib/types"
import { themes } from "@/lib/themes"
import { buildShareUrl } from "@/lib/codec"

type Language = "en" | "zh"

const translations = {
  en: {
    title: "Create Qixi Card",
    settings: "Customize",
    to: "To (Recipient Name)",
    from: "From (Your Name)",
    customMessage: "Message",
    customSubtitle: "Subtitle",
    visualEffects: "Visual Effects",
    starrySky: "Starry Sky",
    floatingPetals: "Floating Petals",
    background: "Background",
    uploadBackground: "Upload Background Image",
    mosaicEffect: "Blur Effect",
    removeBackground: "Remove Background",
    language: "Language",
    theme: "Color Theme",
    font: "Font Style",
    avatar: "Avatar",
    music: "Music",
    share: "Share",
    preview: "Preview",
    serif: "Serif",
    rounded: "Rounded",
    handwritten: "Handwritten",
  },
  zh: {
    title: "制作七夕贺卡",
    settings: "自定义",
    to: "收件人（TA的名字）",
    from: "发件人（你的名字）",
    customMessage: "祝福语",
    customSubtitle: "副标题",
    visualEffects: "视觉效果",
    starrySky: "星空",
    floatingPetals: "飘落花瓣",
    background: "背景",
    uploadBackground: "上传背景图片",
    mosaicEffect: "模糊效果",
    removeBackground: "移除背景",
    language: "语言",
    theme: "颜色主题",
    font: "字体风格",
    avatar: "头像",
    music: "音乐",
    share: "分享",
    preview: "预览",
    serif: "衬线体",
    rounded: "圆体",
    handwritten: "手写体",
  },
}

const AVATARS = ["💌", "💕", "🌹", "🦋", "🌙", "✨"]
const FONT_OPTIONS = ["serif", "rounded", "handwritten"] as const

export default function CreatePage() {
  const [language, setLanguage] = useState<Language>("zh")
  const [showSettings, setShowSettings] = useState(false)
  const [showStars, setShowStars] = useState(true)
  const [showPetals, setShowPetals] = useState(true)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [useMosaic, setUseMosaic] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [showShare, setShowShare] = useState(false)

  const [cardData, setCardData] = useState<CardData>({
    to: "",
    from: "",
    message: "七夕节快乐，我的女神",
    subtitle: "愿你们的爱情如银河般永恒璀璨",
    theme: "starry-blue",
    font: "serif",
    avatar: 0,
    music: 0,
  })

  const t = translations[language]

  const updateCard = useCallback((patch: Partial<CardData>) => {
    setCardData((prev) => ({ ...prev, ...patch }))
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setBackgroundImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const currentTheme = themes.find((th) => th.id === cardData.theme) ?? themes[0]

  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: useMosaic
          ? "blur(1px) brightness(0.7) contrast(1.2) saturate(1.5)"
          : "brightness(0.7)",
      }
    : {}

  const shareUrl = buildShareUrl(cardData)

  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-b ${currentTheme.bg}`}>
      {backgroundImage && <div className="absolute inset-0 z-0" style={backgroundStyle} />}
      {showStars && <StarrySky color={currentTheme.star} />}
      {showPetals && <FallingPetals />}

      <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
        <div ref={cardRef}>
          <EnvelopeCard data={cardData} animate />
        </div>
      </div>

      {/* Language toggle */}
      <Button
        onClick={() => setLanguage(language === "en" ? "zh" : "en")}
        className="fixed top-4 left-4 z-30 bg-primary/80 hover:bg-primary text-primary-foreground backdrop-blur-sm"
        size="icon"
      >
        <Languages className="h-4 w-4" />
      </Button>

      {/* Settings button */}
      <Button
        onClick={() => setShowSettings(true)}
        className="fixed top-4 right-4 z-30 bg-primary/80 hover:bg-primary text-primary-foreground backdrop-blur-sm"
        size="icon"
      >
        <Settings className="h-4 w-4" />
      </Button>

      {/* Share button */}
      <Button
        onClick={() => setShowShare(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-primary hover:bg-primary/90 text-primary-foreground backdrop-blur-sm px-8"
      >
        <Share2 className="h-4 w-4 mr-2" />
        {t.share}
      </Button>

      {/* Settings drawer */}
      {showSettings && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-sidebar border-l border-sidebar-border shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-sidebar-foreground">{t.settings}</h2>
                <Button
                  onClick={() => setShowSettings(false)}
                  variant="ghost"
                  size="icon"
                  className="text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Language */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sidebar-foreground">{t.language}</h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setLanguage("en")}
                      variant={language === "en" ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                    >
                      English
                    </Button>
                    <Button
                      onClick={() => setLanguage("zh")}
                      variant={language === "zh" ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                    >
                      中文
                    </Button>
                  </div>
                </div>

                {/* Recipient & Sender */}
                <div className="space-y-2">
                  <Label htmlFor="to-name" className="text-sidebar-foreground">
                    {t.to}
                  </Label>
                  <Input
                    id="to-name"
                    value={cardData.to}
                    onChange={(e) => updateCard({ to: e.target.value })}
                    className="bg-input border-sidebar-border text-sidebar-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="from-name" className="text-sidebar-foreground">
                    {t.from}
                  </Label>
                  <Input
                    id="from-name"
                    value={cardData.from}
                    onChange={(e) => updateCard({ from: e.target.value })}
                    className="bg-input border-sidebar-border text-sidebar-foreground"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="custom-text" className="text-sidebar-foreground">
                    {t.customMessage}
                  </Label>
                  <Textarea
                    id="custom-text"
                    value={cardData.message}
                    onChange={(e) => updateCard({ message: e.target.value })}
                    className="bg-input border-sidebar-border text-sidebar-foreground"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-subtitle" className="text-sidebar-foreground">
                    {t.customSubtitle}
                  </Label>
                  <Textarea
                    id="custom-subtitle"
                    value={cardData.subtitle}
                    onChange={(e) => updateCard({ subtitle: e.target.value })}
                    className="bg-input border-sidebar-border text-sidebar-foreground"
                    rows={3}
                  />
                </div>

                {/* Theme */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sidebar-foreground flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    {t.theme}
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {themes.map((th) => (
                      <button
                        key={th.id}
                        onClick={() => updateCard({ theme: th.id })}
                        className={`p-2 rounded-lg border-2 transition-all text-xs ${
                          cardData.theme === th.id
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-transparent hover:border-muted-foreground/30"
                        }`}
                      >
                        <div
                          className={`w-full h-6 rounded bg-gradient-to-r ${th.bg} mb-1`}
                        />
                        <span className="text-sidebar-foreground">
                          {language === "zh" ? th.nameZh : th.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sidebar-foreground">{t.font}</h3>
                  <div className="flex gap-2">
                    {FONT_OPTIONS.map((f) => (
                      <Button
                        key={f}
                        onClick={() => updateCard({ font: f })}
                        variant={cardData.font === f ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                      >
                        {t[f as keyof typeof t] ?? f}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Avatar */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sidebar-foreground">{t.avatar}</h3>
                  <div className="flex gap-2 flex-wrap">
                    {AVATARS.map((a, i) => (
                      <button
                        key={i}
                        onClick={() => updateCard({ avatar: i })}
                        className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-xl transition-all ${
                          cardData.avatar === i
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-transparent hover:border-muted-foreground/30"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visual effects */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sidebar-foreground">{t.visualEffects}</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="stars-toggle" className="text-sidebar-foreground">
                      {t.starrySky}
                    </Label>
                    <Switch id="stars-toggle" checked={showStars} onCheckedChange={setShowStars} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="petals-toggle" className="text-sidebar-foreground">
                      {t.floatingPetals}
                    </Label>
                    <Switch
                      id="petals-toggle"
                      checked={showPetals}
                      onCheckedChange={setShowPetals}
                    />
                  </div>
                </div>

                {/* Background */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sidebar-foreground">{t.background}</h3>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {t.uploadBackground}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {backgroundImage && (
                    <>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="mosaic-toggle" className="text-sidebar-foreground">
                          {t.mosaicEffect}
                        </Label>
                        <Switch
                          id="mosaic-toggle"
                          checked={useMosaic}
                          onCheckedChange={setUseMosaic}
                        />
                      </div>
                      <Button
                        onClick={() => setBackgroundImage(null)}
                        variant="destructive"
                        size="sm"
                        className="w-full"
                      >
                        {t.removeBackground}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share dialog */}
      {showShare && (
        <ShareDialog
          shareUrl={shareUrl}
          cardRef={cardRef}
          onClose={() => setShowShare(false)}
          lang={language}
        />
      )}
    </div>
  )
}
