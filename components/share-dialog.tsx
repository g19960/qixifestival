"use client"

import { useState, useCallback } from "react"
import { toPng } from "html-to-image"
import { Button } from "@/components/ui/button"
import { Copy, Download, Check, X } from "lucide-react"

const shareTranslations = {
  en: {
    title: "Share Card",
    copyLink: "Copy link to send:",
    saveImage: "Or save as image for Moments:",
    generating: "Generating...",
    savePng: "Save as Image",
    copied: "Copied!",
  },
  zh: {
    title: "分享贺卡",
    copyLink: "复制链接发给对方：",
    saveImage: "或保存图片发朋友圈：",
    generating: "生成中...",
    savePng: "保存为图片",
    copied: "已复制！",
  },
}

export function ShareDialog({
  shareUrl,
  cardRef,
  onClose,
  lang = "zh",
}: {
  shareUrl: string
  cardRef: React.RefObject<HTMLDivElement | null>
  onClose: () => void
  lang?: "en" | "zh"
}) {
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)
  const t = shareTranslations[lang]

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [shareUrl])

  const handleExport = useCallback(async () => {
    if (!cardRef.current) return
    setExporting(true)
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: "#1a1a2e",
      })
      const link = document.createElement("a")
      link.download = "qixi-card.png"
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error("Export failed:", err)
    } finally {
      setExporting(false)
    }
  }, [cardRef])

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{t.copyLink}</p>
          <div className="flex gap-2">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 text-xs bg-muted px-3 py-2 rounded-md truncate"
            />
            <Button size="sm" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{t.saveImage}</p>
          <Button
            className="w-full"
            variant="outline"
            onClick={handleExport}
            disabled={exporting}
          >
            <Download className="h-4 w-4 mr-2" />
            {exporting ? t.generating : t.savePng}
          </Button>
        </div>
      </div>
    </div>
  )
}
