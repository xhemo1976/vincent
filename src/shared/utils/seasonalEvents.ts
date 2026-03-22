export interface SeasonalEvent {
  id: string
  name: string
  emoji: string
  description: string
  startMonth: number
  startDay: number
  endMonth: number
  endDay: number
  xpMultiplier: number
  themeColor: string
}

const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    id: 'newyear',
    name: 'Neujahrs-Festival',
    emoji: '🎆',
    description: 'Starte das neue Jahr mit doppelter Kraft!',
    startMonth: 1, startDay: 1,
    endMonth: 1, endDay: 7,
    xpMultiplier: 2,
    themeColor: '#FFD700',
  },
  {
    id: 'valentine',
    name: 'Herz-des-Dojo',
    emoji: '💝',
    description: 'Zeige Liebe zum Lernen!',
    startMonth: 2, startDay: 10,
    endMonth: 2, endDay: 16,
    xpMultiplier: 1.5,
    themeColor: '#E91E63',
  },
  {
    id: 'easter',
    name: 'Fruehlings-Erwachen',
    emoji: '🌸',
    description: 'Der Fruehling bringt neue Kraefte!',
    startMonth: 3, startDay: 20,
    endMonth: 4, endDay: 5,
    xpMultiplier: 1.5,
    themeColor: '#E889D0',
  },
  {
    id: 'summer',
    name: 'Sommer-Dojo',
    emoji: '☀️',
    description: 'Heisse Tage, heisses Training!',
    startMonth: 7, startDay: 1,
    endMonth: 8, endDay: 31,
    xpMultiplier: 1.25,
    themeColor: '#FF9800',
  },
  {
    id: 'halloween',
    name: 'Geister-Dojo',
    emoji: '🎃',
    description: 'Gruselig gutes Lernen!',
    startMonth: 10, startDay: 25,
    endMonth: 11, endDay: 2,
    xpMultiplier: 2,
    themeColor: '#FF6F00',
  },
  {
    id: 'winter',
    name: 'Winter-Meisterschaft',
    emoji: '❄️',
    description: 'Kalte Tage, warmes Wissen!',
    startMonth: 12, startDay: 15,
    endMonth: 12, endDay: 31,
    xpMultiplier: 1.5,
    themeColor: '#4FC3F7',
  },
]

export function getActiveEvent(): SeasonalEvent | null {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()

  return SEASONAL_EVENTS.find((event) => {
    if (event.startMonth === event.endMonth) {
      return month === event.startMonth && day >= event.startDay && day <= event.endDay
    }
    if (event.startMonth < event.endMonth) {
      if (month === event.startMonth) return day >= event.startDay
      if (month === event.endMonth) return day <= event.endDay
      return month > event.startMonth && month < event.endMonth
    }
    // Wraps around year boundary (e.g., Dec -> Jan)
    if (month === event.startMonth) return day >= event.startDay
    if (month === event.endMonth) return day <= event.endDay
    return month > event.startMonth || month < event.endMonth
  }) ?? null
}

export function getUpcomingEvents(count: number = 3): SeasonalEvent[] {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()

  return SEASONAL_EVENTS
    .filter((event) => {
      if (event.startMonth > month) return true
      if (event.startMonth === month && event.startDay > day) return true
      return false
    })
    .slice(0, count)
}
