"use client"

import { useMemo } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export function StarrySky({ color = "bg-white" }: { color?: string }) {
  const stars = useMemo<Star[]>(() => {
    const arr: Star[] = []
    for (let i = 0; i < 100; i++) {
      arr.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
      })
    }
    return arr
  }, [])

  return (
    <div className="absolute inset-0 z-10">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full star ${color}`}
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
  )
}
