export interface CardData {
  to: string
  from: string
  message: string
  subtitle: string
  theme: string
  font: string
  avatar: number
  music: number
}

export const DEFAULT_CARD_DATA: CardData = {
  to: "",
  from: "",
  message: "",
  subtitle: "",
  theme: "starry-blue",
  font: "serif",
  avatar: 0,
  music: 0,
}
