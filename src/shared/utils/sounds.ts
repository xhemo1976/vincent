import { useAudioStore } from '../stores/audioStore'

let audioCtx: AudioContext | null = null
let masterGain: GainNode | null = null

function getAudioContext(): AudioContext {
  if (!audioCtx || audioCtx.state === 'closed') {
    audioCtx = new AudioContext()
    masterGain = audioCtx.createGain()
    masterGain.gain.value = useAudioStore.getState().sfxVolume
    masterGain.connect(audioCtx.destination)
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function getMasterGain(): GainNode {
  getAudioContext()
  return masterGain!
}

function canPlay(): boolean {
  return useAudioStore.getState().sfxEnabled
}

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.3) {
  if (!canPlay()) return
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = type
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)

    const vol = volume * useAudioStore.getState().sfxVolume
    gain.gain.setValueAtTime(vol, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

    osc.connect(gain)
    gain.connect(getMasterGain())

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration + 0.05)
  } catch {
    // Audio not available
  }
}

function playChord(frequencies: number[], duration: number, type: OscillatorType = 'sine', volume = 0.15) {
  frequencies.forEach((f) => playTone(f, duration, type, volume))
}

function playFilteredTone(frequency: number, duration: number, type: OscillatorType, filterFreq: number, volume = 0.3) {
  if (!canPlay()) return
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = type
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)

    filter.type = 'lowpass'
    filter.frequency.value = filterFreq

    const vol = volume * useAudioStore.getState().sfxVolume
    gain.gain.setValueAtTime(vol, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(getMasterGain())

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration + 0.05)
  } catch {
    // Audio not available
  }
}

export function playCorrect() {
  playTone(523, 0.1, 'sine', 0.2)
  setTimeout(() => playTone(659, 0.1, 'sine', 0.2), 80)
  setTimeout(() => playTone(784, 0.15, 'sine', 0.25), 160)
}

export function playWrong() {
  playFilteredTone(200, 0.25, 'sawtooth', 600, 0.15)
  setTimeout(() => playFilteredTone(150, 0.35, 'sawtooth', 400, 0.12), 150)
}

export function playCoin() {
  playTone(1200, 0.05, 'sine', 0.12)
  setTimeout(() => playTone(1600, 0.08, 'sine', 0.15), 50)
  setTimeout(() => playTone(2000, 0.06, 'sine', 0.1), 100)
}

export function playLevelUp() {
  const notes = [523, 659, 784, 1047, 1318]
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.25, 'sine', 0.2), i * 100)
  })
  setTimeout(() => playChord([1047, 1318, 1568], 0.6, 'sine', 0.12), 500)
}

export function playCombo() {
  playTone(880, 0.06, 'triangle', 0.15)
  setTimeout(() => playTone(1100, 0.08, 'triangle', 0.18), 60)
  setTimeout(() => playTone(1320, 0.1, 'triangle', 0.12), 120)
}

export function playClick() {
  playFilteredTone(800, 0.03, 'sine', 2000, 0.08)
}

export function playBossHit() {
  playFilteredTone(150, 0.15, 'sawtooth', 1200, 0.25)
  setTimeout(() => playFilteredTone(100, 0.2, 'square', 800, 0.2), 80)
  setTimeout(() => playTone(600, 0.1, 'sine', 0.15), 60)
}

export function playBossDeath() {
  const descend = [400, 350, 300, 250, 200, 150, 100]
  descend.forEach((freq, i) => {
    setTimeout(() => playFilteredTone(freq, 0.15, 'sawtooth', 1500, 0.2), i * 80)
  })
  setTimeout(() => playChord([523, 659, 784], 0.8, 'sine', 0.15), 600)
}

export function playShopBuy() {
  playTone(800, 0.08, 'sine', 0.12)
  setTimeout(() => playTone(1000, 0.08, 'sine', 0.15), 80)
  setTimeout(() => playTone(1200, 0.12, 'sine', 0.18), 160)
  setTimeout(() => playCoin(), 250)
}

export function playTrophyEarn() {
  playChord([523, 659, 784], 0.15, 'sine', 0.12)
  setTimeout(() => playChord([659, 784, 1047], 0.2, 'sine', 0.15), 200)
  setTimeout(() => playChord([784, 1047, 1318], 0.4, 'sine', 0.18), 400)
}

export function playStreakPop() {
  playTone(600, 0.05, 'sine', 0.1)
  setTimeout(() => playTone(900, 0.08, 'sine', 0.15), 60)
  setTimeout(() => playTone(1200, 0.1, 'sine', 0.12), 120)
}

export function playSuccess() {
  playChord([523, 659, 784, 1047], 0.5, 'sine', 0.12)
}

export function playError() {
  playFilteredTone(250, 0.3, 'square', 500, 0.12)
}

export function playMenuOpen() {
  playTone(400, 0.05, 'sine', 0.06)
  setTimeout(() => playTone(600, 0.05, 'sine', 0.08), 40)
}

export function playMenuClose() {
  playTone(600, 0.05, 'sine', 0.06)
  setTimeout(() => playTone(400, 0.05, 'sine', 0.08), 40)
}

export function updateSFXVolume(vol: number) {
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime(vol, audioCtx.currentTime)
  }
}
