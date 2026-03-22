import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AudioState {
  bgmVolume: number
  sfxVolume: number
  bgmEnabled: boolean
  sfxEnabled: boolean
  currentTrack: string | null
  setBGMVolume: (v: number) => void
  setSFXVolume: (v: number) => void
  toggleBGM: () => void
  toggleSFX: () => void
  setTrack: (track: string | null) => void
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      bgmVolume: 0.4,
      sfxVolume: 0.6,
      bgmEnabled: true,
      sfxEnabled: true,
      currentTrack: null,
      setBGMVolume: (v) => set({ bgmVolume: v }),
      setSFXVolume: (v) => set({ sfxVolume: v }),
      toggleBGM: () => set((s) => ({ bgmEnabled: !s.bgmEnabled })),
      toggleSFX: () => set((s) => ({ sfxEnabled: !s.sfxEnabled })),
      setTrack: (track) => set({ currentTrack: track }),
    }),
    { name: 'shin-dojo-audio' }
  )
)
