export interface Theme {
  id: string
  name: string
  nameZh: string
  bg: string
  envelope: string
  envelopeFlap: string
  border: string
  text: string
  textSub: string
  accent: string
  star: string
}

export const themes: Theme[] = [
  {
    id: "starry-blue",
    name: "Starry Blue",
    nameZh: "星空蓝",
    bg: "from-indigo-900 via-purple-900 to-pink-900",
    envelope: "from-amber-50 to-orange-100",
    envelopeFlap: "from-amber-100 to-amber-200",
    border: "border-amber-200",
    text: "text-amber-900",
    textSub: "text-amber-800",
    accent: "bg-red-500",
    star: "bg-white",
  },
  {
    id: "peach-pink",
    name: "Peach Blossom",
    nameZh: "桃花粉",
    bg: "from-rose-900 via-pink-800 to-fuchsia-900",
    envelope: "from-pink-50 to-rose-100",
    envelopeFlap: "from-pink-100 to-pink-200",
    border: "border-pink-200",
    text: "text-rose-900",
    textSub: "text-rose-800",
    accent: "bg-rose-500",
    star: "bg-pink-100",
  },
  {
    id: "moonlight-gold",
    name: "Moonlight Gold",
    nameZh: "月光金",
    bg: "from-amber-950 via-yellow-900 to-orange-950",
    envelope: "from-yellow-50 to-amber-100",
    envelopeFlap: "from-yellow-100 to-amber-200",
    border: "border-amber-200",
    text: "text-amber-900",
    textSub: "text-amber-800",
    accent: "bg-amber-500",
    star: "bg-amber-200",
  },
  {
    id: "aurora-green",
    name: "Aurora Green",
    nameZh: "极光绿",
    bg: "from-emerald-950 via-teal-900 to-cyan-950",
    envelope: "from-emerald-50 to-teal-100",
    envelopeFlap: "from-emerald-100 to-teal-200",
    border: "border-emerald-200",
    text: "text-emerald-900",
    textSub: "text-emerald-800",
    accent: "bg-emerald-500",
    star: "bg-emerald-200",
  },
  {
    id: "sunset-purple",
    name: "Sunset Purple",
    nameZh: "晚霞紫",
    bg: "from-violet-950 via-purple-900 to-fuchsia-950",
    envelope: "from-violet-50 to-purple-100",
    envelopeFlap: "from-violet-100 to-purple-200",
    border: "border-violet-200",
    text: "text-violet-900",
    textSub: "text-violet-800",
    accent: "bg-violet-500",
    star: "bg-violet-200",
  },
  {
    id: "cherry-red",
    name: "Cherry Red",
    nameZh: "樱桃红",
    bg: "from-red-950 via-rose-900 to-pink-950",
    envelope: "from-red-50 to-rose-100",
    envelopeFlap: "from-red-100 to-rose-200",
    border: "border-red-200",
    text: "text-red-900",
    textSub: "text-red-800",
    accent: "bg-red-600",
    star: "bg-red-200",
  },
]

export function getTheme(id: string): Theme {
  return themes.find((t) => t.id === id) ?? themes[0]
}
