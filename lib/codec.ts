import pako from "pako"
import type { CardData } from "./types"
import { DEFAULT_CARD_DATA } from "./types"

function toBase64Url(bytes: Uint8Array): string {
  let binary = ""
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function fromBase64Url(str: string): Uint8Array {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/")
  const pad = b64.length % 4 === 0 ? 0 : 4 - (b64.length % 4)
  const binary = atob(b64 + "=".repeat(pad))
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

export function encodeCard(data: CardData): string {
  const json = JSON.stringify(data)
  const compressed = pako.deflate(json)
  return toBase64Url(compressed)
}

export function decodeCard(encoded: string): CardData {
  try {
    const bytes = fromBase64Url(encoded)
    const json = pako.inflate(bytes, { to: "string" })
    const parsed = JSON.parse(json)
    return { ...DEFAULT_CARD_DATA, ...parsed }
  } catch {
    return DEFAULT_CARD_DATA
  }
}

export function buildShareUrl(data: CardData): string {
  const encoded = encodeCard(data)
  const base = typeof window !== "undefined" ? window.location.origin : ""
  return `${base}/c#${encoded}`
}

export function parseCardFromHash(): CardData | null {
  if (typeof window === "undefined") return null
  const hash = window.location.hash.slice(1)
  if (!hash) return null
  return decodeCard(hash)
}
