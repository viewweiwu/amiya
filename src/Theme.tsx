export type ThemeColor = 'light' | 'dark'

export let theme = 'light'
export function setTheme(color: ThemeColor) {
  theme = color
}
