import type { AuraColor } from '../stores/userStore'

export const AVATAR_VIEWBOX = '0 0 400 500'
export const AVATAR_WIDTH = 400
export const AVATAR_HEIGHT = 500

export const AURA_COLORS: Record<AuraColor, string[]> = {
  none: [],
  purple: ['#B388FF', '#7C4DFF', '#651FFF'],
  blue: ['#80D8FF', '#40C4FF', '#00B0FF'],
  green: ['#B9F6CA', '#69F0AE', '#00E676'],
  red: ['#FF8A80', '#FF5252', '#FF1744'],
  gold: ['#FFE57F', '#FFD740', '#FFC400'],
}

export const OUTFIT_COLORS: Record<string, { main: string; dark: string; accent: string; highlight: string }> = {
  'gi-white': { main: '#F5F5F5', dark: '#D0D0D0', accent: '#BDBDBD', highlight: '#FFFFFF' },
  'gi-blue': { main: '#42A5F5', dark: '#1565C0', accent: '#0D47A1', highlight: '#90CAF9' },
  'gi-green': { main: '#66BB6A', dark: '#2E7D32', accent: '#1B5E20', highlight: '#A5D6A7' },
  'gi-red': { main: '#EF5350', dark: '#C62828', accent: '#B71C1C', highlight: '#EF9A9A' },
  'gi-purple': { main: '#AB47BC', dark: '#6A1B9A', accent: '#4A148C', highlight: '#CE93D8' },
  'gi-black': { main: '#37474F', dark: '#1A1A2E', accent: '#0D0D1A', highlight: '#546E7A' },
  'gi-gold': { main: '#FFD54F', dark: '#FF8F00', accent: '#E65100', highlight: '#FFF176' },
  'gi-cyber': { main: '#1A237E', dark: '#0D1642', accent: '#00E5FF', highlight: '#3949AB' },
  'gi-dragon': { main: '#1B5E20', dark: '#0D3010', accent: '#00E676', highlight: '#388E3C' },
  'gi-phoenix': { main: '#BF360C', dark: '#7F1D06', accent: '#FF6D00', highlight: '#E64A19' },
}

export function getOutfitColor(id: string) {
  return OUTFIT_COLORS[id] || OUTFIT_COLORS['gi-white']
}

export function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xFF) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xFF) + amount))
  const b = Math.min(255, Math.max(0, (num & 0xFF) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

export function colorWithAlpha(hex: string, alpha: number): string {
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0')
  return `${hex}${a}`
}
