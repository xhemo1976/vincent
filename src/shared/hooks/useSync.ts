import { useEffect, useRef } from 'react'
import { useAuth } from '../lib/AuthProvider'
import { pullState, pushState } from '../lib/syncEngine'
import { useUserStore } from '../stores/userStore'
import { useStreakStore } from '../stores/streakStore'
import { useCoinsStore } from '../stores/coinsStore'
import { useXPStore } from '../stores/xpStore'
import { useInventoryStore } from '../stores/inventoryStore'
import { useAnalyticsStore } from '../stores/analyticsStore'
import { useMissionsStore } from '../stores/missionsStore'
import { useComboStore } from '../stores/comboStore'

const OFFLINE_QUEUE_KEY = 'shin-dojo-offline-queue'

function queueOfflinePush() {
  try {
    localStorage.setItem(OFFLINE_QUEUE_KEY, Date.now().toString())
  } catch {
    // localStorage full or unavailable
  }
}

function hasOfflineQueue(): boolean {
  return !!localStorage.getItem(OFFLINE_QUEUE_KEY)
}

function clearOfflineQueue() {
  localStorage.removeItem(OFFLINE_QUEUE_KEY)
}

export function useSync() {
  const { user } = useAuth()
  const hasPulled = useRef(false)
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Pull on first login
  useEffect(() => {
    if (!user || hasPulled.current) return
    hasPulled.current = true
    pullState(user.id)
  }, [user])

  // Sync queued offline changes on reconnect
  useEffect(() => {
    if (!user) return

    const handleOnline = () => {
      if (hasOfflineQueue()) {
        pushState(user.id)
        clearOfflineQueue()
      }
    }

    window.addEventListener('online', handleOnline)

    // Check if we came back online with pending changes
    if (navigator.onLine && hasOfflineQueue()) {
      handleOnline()
    }

    return () => window.removeEventListener('online', handleOnline)
  }, [user])

  // Debounced push on any store change
  useEffect(() => {
    if (!user) return

    const schedulePush = () => {
      if (pushTimer.current) clearTimeout(pushTimer.current)
      pushTimer.current = setTimeout(() => {
        if (navigator.onLine) {
          pushState(user.id)
        } else {
          queueOfflinePush()
        }
      }, 2000)
    }

    const unsubs = [
      useUserStore.subscribe(schedulePush),
      useStreakStore.subscribe(schedulePush),
      useCoinsStore.subscribe(schedulePush),
      useXPStore.subscribe(schedulePush),
      useInventoryStore.subscribe(schedulePush),
      useAnalyticsStore.subscribe(schedulePush),
      useMissionsStore.subscribe(schedulePush),
      useComboStore.subscribe(schedulePush),
    ]

    return () => {
      unsubs.forEach((u) => u())
      if (pushTimer.current) clearTimeout(pushTimer.current)
    }
  }, [user])
}
