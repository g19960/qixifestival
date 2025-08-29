"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Upload, X, Heart, Languages } from "lucide-react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

interface Petal {
  id: number
  x: number
  delay: number
  duration: number
  size: number
}

type Language = "en" | "zh"

const translations = {
  en: {
    title: "Happy Qixi Festival, my goddess",
    subtitle:
      "Happy Qixi Festival! May the Cowherd and Weaver Girl in the sky bless your love, and may your love be as eternal and brilliant as the Milky Way.",
    settings: "Settings",
    customMessage: "Custom Message",
    customSubtitle: "Custom Subtitle",
    visualEffects: "Visual Effects",
    starrySky: "Starry Sky",
    floatingPetals: "Floating Petals",
    background: "Background",
    uploadBackground: "Upload Background Image",
    mosaicEffect: "Mosaic Effect",
    removeBackground: "Remove Background",
    language: "Language",
  },
  zh: {
    title: "七夕节快乐，我的女神",
    subtitle: "七夕节快乐！愿天上的牛郎织女为你们的爱情祝福，愿你们的爱情如银河般永恒璀璨。",
    settings: "设置",
    customMessage: "自定义消息",
    customSubtitle: "自定义副标题",
    visualEffects: "视觉效果",
    starrySky: "星空",
    floatingPetals: "飘落花瓣",
    background: "背景",
    uploadBackground: "上传背景图片",
    mosaicEffect: "马赛克效果",
    removeBackground: "移除背景",
    language: "语言",
  },
}

export default function QixiFestivalPage() {
  const [showSettings, setShowSettings] = useState(false)
  const [language, setLanguage] = useState<Language>("en")
  const [customText, setCustomText] = useState(translations.en.title)
  const [customSubtitle, setCustomSubtitle] = useState(translations.en.subtitle)
  const [showStars, setShowStars] = useState(true)
  const [showPetals, setShowPetals] = useState(true)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [useMosaic, setUseMosaic] = useState(false)
  const [stars, setStars] = useState<Star[]>([])
  const [petals, setPetals] = useState<Petal[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (customText === translations.en.title || customText === translations.zh.title) {
      setCustomText(translations[language].title)
    }
    if (customSubtitle === translations.en.subtitle || customSubtitle === translations.zh.subtitle) {
      setCustomSubtitle(translations[language].subtitle)
    }
  }, [language, customText, customSubtitle])

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 3,
        })
      }
      setStars(newStars)
    }
    generateStars()
  }, [])

  useEffect(() => {
    const generatePetals = () => {
      const newPetals: Petal[] = []
      for (let i = 0; i < 20; i++) {
        newPetals.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 10,
          duration: Math.random() * 10 + 15,
          size: Math.random() * 20 + 10,
        })
      }
      setPetals(newPetals)
    }
    generatePetals()
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: useMosaic ? "blur(1px) brightness(0.7) contrast(1.2) saturate(1.5)" : "brightness(0.7)",
      }
    : {}

  const t = translations[language]

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900">
      {backgroundImage && <div className="absolute inset-0 z-0" style={backgroundStyle} />}

      {showStars && (
        <div className="absolute inset-0 z-10">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {showPetals && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="absolute petal"
              style={{
                left: `${petal.x}%`,
                animationDelay: `${petal.delay}s`,
                animationDuration: `${petal.duration}s`,
                width: `${petal.size}px`,
                height: `${petal.size}px`,
              }}
            >
              <Heart className="w-full h-full text-pink-300 fill-pink-300/50" />
            </div>
          ))}
        </div>
      )}

      <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-2xl w-full relative">
          {/* Envelope body */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-200 shadow-2xl relative overflow-hidden envelope-body">
            {/* Envelope flap */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-amber-100 to-amber-200 envelope-flap">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full shadow-lg envelope-seal">
                <Heart className="w-5 h-5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Envelope content */}
            <div className="pt-24 pb-8 px-8 text-center">
              <div className="floating-text">
                <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-4 text-balance font-serif">
                  {customText}
                </h1>
              </div>

              <p className="text-lg text-amber-800 mb-8 text-pretty leading-relaxed font-serif">{customSubtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={() => setLanguage(language === "en" ? "zh" : "en")}
        className="fixed top-4 left-4 z-30 bg-primary/80 hover:bg-primary text-primary-foreground backdrop-blur-sm"
        size="icon"
      >
        <Languages className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => setShowSettings(true)}
        className="fixed top-4 right-4 z-30 bg-primary/80 hover:bg-primary text-primary-foreground backdrop-blur-sm"
        size="icon"
      >
        <Settings className="h-4 w-4" />
      </Button>

      {showSettings && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-sidebar border-l border-sidebar-border shadow-2xl">
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

                <div className="space-y-2">
                  <Label htmlFor="custom-text" className="text-sidebar-foreground">
                    {t.customMessage}
                  </Label>
                  <Textarea
                    id="custom-text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
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
                    value={customSubtitle}
                    onChange={(e) => setCustomSubtitle(e.target.value)}
                    className="bg-input border-sidebar-border text-sidebar-foreground"
                    rows={4}
                  />
                </div>

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
                    <Switch id="petals-toggle" checked={showPetals} onCheckedChange={setShowPetals} />
                  </div>
                </div>

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
                        <Switch id="mosaic-toggle" checked={useMosaic} onCheckedChange={setUseMosaic} />
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
    </div>
  )
}
