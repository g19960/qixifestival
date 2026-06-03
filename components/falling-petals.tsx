"use client"

import { useMemo } from "react"
import { Heart } from "lucide-react"

interface Petal {
  id: number
  x: number
  delay: number
  duration: number
  size: number
}

export function FallingPetals() {
  const petals = useMemo<Petal[]>(() => {
    const arr: Petal[] = []
    for (let i = 0; i < 20; i++) {
      arr.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 10 + 15,
        size: Math.random() * 20 + 10,
      })
    }
    return arr
  }, [])

  return (
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
  )
}
