"use client"

import { useState, useEffect } from "react"

export function TypeWriter({
  text,
  delay = 0,
  speed = 80,
  className,
}: {
  text: string
  delay?: number
  speed?: number
  className?: string
}) {
  const [displayed, setDisplayed] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)

    return () => clearTimeout(timer)
  }, [started, displayed, text, speed])

  return (
    <span className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-0.5 h-[1em] bg-current animate-pulse ml-0.5 align-middle" />
      )}
    </span>
  )
}
