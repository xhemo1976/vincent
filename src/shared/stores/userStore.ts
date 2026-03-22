import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeColor = 'purple' | 'green' | 'blue' | 'red'
export type HairStyle = 'spiky' | 'long' | 'short' | 'mohawk' | 'samurai'
export type SkinTone = '#FFDAB9' | '#F5CBA7' | '#D4A574' | '#A0785A' | '#6B4226'
export type EyeStyle = 'sharp' | 'round' | 'narrow' | 'cyber'
export type AuraColor = 'none' | 'purple' | 'blue' | 'green' | 'red' | 'gold'
export type FaceExpression = 'neutral' | 'happy' | 'determined' | 'angry' | 'surprised' | 'cool'

interface AvatarConfig {
  hairColor: string
  hairStyle: HairStyle
  skinTone: SkinTone
  eyeStyle: EyeStyle
  aura: AuraColor
  expression: FaceExpression
  outfit: string
  accessory: string
}

interface UserState {
  name: string
  theme: ThemeColor
  darkMode: boolean
  isOnboarded: boolean
  avatarConfig: AvatarConfig
  setName: (name: string) => void
  setTheme: (theme: ThemeColor) => void
  toggleDarkMode: () => void
  setOnboarded: (onboarded: boolean) => void
  setAvatarConfig: (config: Partial<AvatarConfig>) => void
  reset: () => void
}

const initialState = {
  name: '',
  theme: 'purple' as ThemeColor,
  darkMode: true,
  isOnboarded: false,
  avatarConfig: {
    hairColor: '#2D2B3D',
    hairStyle: 'spiky' as HairStyle,
    skinTone: '#FFDAB9' as SkinTone,
    eyeStyle: 'sharp' as EyeStyle,
    aura: 'none' as AuraColor,
    expression: 'neutral' as FaceExpression,
    outfit: 'gi-white',
    accessory: 'none',
  },
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setName: (name) => set({ name }),
      setTheme: (theme) => set({ theme }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setOnboarded: (onboarded) => set({ isOnboarded: onboarded }),
      setAvatarConfig: (config) =>
        set((state) => ({
          avatarConfig: { ...state.avatarConfig, ...config },
        })),
      reset: () => set(initialState),
    }),
    { name: 'shin-dojo-user' }
  )
)
