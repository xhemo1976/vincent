import { useAudioStore } from '../stores/audioStore'

type Note = [number, number] // [frequency Hz, duration ms]

interface Track {
  name: string
  tempo: number // bpm
  melody: Note[]
  bass: Note[]
  waveform: OscillatorType
  bassWaveform: OscillatorType
  filterFreq: number
}

// Pentatonic scale frequencies (C4-based)
const C4 = 261.63, D4 = 293.66, E4 = 329.63, G4 = 392.00, A4 = 440.00
const C5 = 523.25, D5 = 587.33, E5 = 659.25, G5 = 783.99
const C3 = 130.81, E3 = 164.81, G3 = 196.00, A3 = 220.00
const REST = 0

const TRACKS: Record<string, Track> = {
  dashboard: {
    name: 'dashboard',
    tempo: 72,
    waveform: 'sine',
    bassWaveform: 'triangle',
    filterFreq: 2000,
    melody: [
      [E4, 500], [G4, 500], [A4, 750], [REST, 250],
      [G4, 500], [E4, 500], [D4, 750], [REST, 250],
      [C4, 500], [D4, 500], [E4, 750], [REST, 250],
      [D4, 500], [C4, 500], [A3, 750], [REST, 250],
    ],
    bass: [
      [C3, 1000], [C3, 1000], [A3, 1000], [A3, 1000],
      [G3, 1000], [G3, 1000], [C3, 1000], [C3, 1000],
    ],
  },
  english: {
    name: 'english',
    tempo: 80,
    waveform: 'sine',
    bassWaveform: 'sine',
    filterFreq: 2500,
    melody: [
      [C5, 400], [D5, 400], [E5, 600], [REST, 200],
      [D5, 400], [C5, 400], [A4, 600], [REST, 200],
      [G4, 400], [A4, 400], [C5, 600], [REST, 200],
      [A4, 400], [G4, 400], [E4, 600], [REST, 200],
    ],
    bass: [
      [C3, 800], [E3, 800], [A3, 800], [G3, 800],
      [C3, 800], [E3, 800], [G3, 800], [C3, 800],
    ],
  },
  math: {
    name: 'math',
    tempo: 95,
    waveform: 'square',
    bassWaveform: 'sawtooth',
    filterFreq: 1800,
    melody: [
      [E4, 300], [E4, 300], [G4, 400], [REST, 200],
      [A4, 300], [G4, 300], [E4, 400], [REST, 200],
      [D4, 300], [E4, 300], [G4, 400], [REST, 200],
      [A4, 300], [C5, 300], [A4, 400], [REST, 200],
    ],
    bass: [
      [C3, 600], [REST, 200], [C3, 600], [REST, 200],
      [G3, 600], [REST, 200], [G3, 600], [REST, 200],
    ],
  },
  boss: {
    name: 'boss',
    tempo: 130,
    waveform: 'sawtooth',
    bassWaveform: 'square',
    filterFreq: 3000,
    melody: [
      [E4, 200], [E4, 200], [E5, 300], [REST, 100],
      [D5, 200], [C5, 200], [A4, 300], [REST, 100],
      [G4, 200], [A4, 200], [G4, 200], [E4, 200],
      [C4, 300], [REST, 100], [E4, 200], [REST, 100],
    ],
    bass: [
      [C3, 400], [C3, 400], [E3, 400], [E3, 400],
      [A3, 400], [G3, 400], [C3, 400], [C3, 400],
    ],
  },
  shop: {
    name: 'shop',
    tempo: 100,
    waveform: 'triangle',
    bassWaveform: 'sine',
    filterFreq: 3500,
    melody: [
      [C5, 300], [E5, 300], [G5, 450], [REST, 150],
      [E5, 300], [C5, 300], [G4, 450], [REST, 150],
      [A4, 300], [C5, 300], [E5, 450], [REST, 150],
      [D5, 300], [C5, 300], [A4, 450], [REST, 150],
    ],
    bass: [
      [C3, 600], [E3, 600], [G3, 600], [E3, 600],
      [A3, 600], [G3, 600], [C3, 600], [C3, 600],
    ],
  },
}

class MusicEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private currentTrackName: string | null = null
  private isPlaying = false
  private scheduledIds: number[] = []
  private melodyTimeout: ReturnType<typeof setTimeout> | null = null
  private bassTimeout: ReturnType<typeof setTimeout> | null = null

  private getContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      this.ctx = new AudioContext()
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.value = useAudioStore.getState().bgmVolume * 0.15
      this.masterGain.connect(this.ctx.destination)
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    return this.ctx
  }

  private playNote(freq: number, duration: number, waveform: OscillatorType, filterFreq: number, startTime: number, volume = 0.3) {
    if (freq === REST || !this.masterGain) return

    const ctx = this.getContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = waveform
    osc.frequency.value = freq

    filter.type = 'lowpass'
    filter.frequency.value = filterFreq
    filter.Q.value = 1

    const durationSec = duration / 1000
    gain.gain.setValueAtTime(0, startTime)
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.02)
    gain.gain.setValueAtTime(volume, startTime + durationSec * 0.7)
    gain.gain.linearRampToValueAtTime(0, startTime + durationSec)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.masterGain)

    osc.start(startTime)
    osc.stop(startTime + durationSec + 0.05)
  }

  private loopTrack(trackName: string) {
    if (!this.isPlaying || this.currentTrackName !== trackName) return

    const track = TRACKS[trackName]
    if (!track) return

    const ctx = this.getContext()
    const now = ctx.currentTime + 0.1

    // Schedule melody
    let melodyTime = 0
    for (const [freq, dur] of track.melody) {
      this.playNote(freq, dur, track.waveform, track.filterFreq, now + melodyTime / 1000, 0.2)
      melodyTime += dur
    }

    // Schedule bass
    let bassTime = 0
    for (const [freq, dur] of track.bass) {
      this.playNote(freq, dur, track.bassWaveform, 800, now + bassTime / 1000, 0.15)
      bassTime += dur
    }

    const loopDuration = Math.max(melodyTime, bassTime)
    this.melodyTimeout = setTimeout(() => this.loopTrack(trackName), loopDuration)
  }

  play(trackName: string) {
    const state = useAudioStore.getState()
    if (!state.bgmEnabled) return
    if (this.currentTrackName === trackName && this.isPlaying) return

    this.stop()
    this.currentTrackName = trackName
    this.isPlaying = true
    this.setVolume(state.bgmVolume)
    this.loopTrack(trackName)
  }

  stop() {
    this.isPlaying = false
    this.currentTrackName = null
    if (this.melodyTimeout) clearTimeout(this.melodyTimeout)
    if (this.bassTimeout) clearTimeout(this.bassTimeout)
    this.scheduledIds.forEach(clearTimeout)
    this.scheduledIds = []

    // Fade out
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3)
    }
  }

  setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(vol * 0.15, this.ctx.currentTime)
    }
  }

  toggle() {
    const state = useAudioStore.getState()
    if (state.bgmEnabled) {
      this.stop()
    } else if (this.currentTrackName) {
      this.play(this.currentTrackName)
    }
  }

  getTrackForRoute(path: string): string | null {
    if (path.includes('/boss')) return 'boss'
    if (path.includes('/english')) return 'english'
    if (path.includes('/math')) return 'math'
    if (path.includes('/shop') || path.includes('/avatar') || path.includes('/trophies')) return 'shop'
    if (path.includes('/module/')) return 'english'
    if (path === '/dashboard' || path === '/') return 'dashboard'
    if (path.includes('/missions') || path.includes('/map')) return 'dashboard'
    return 'dashboard'
  }
}

export const musicEngine = new MusicEngine()
