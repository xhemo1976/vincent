import { supabase } from './supabase'
import { useUserStore } from '../stores/userStore'
import { useStreakStore } from '../stores/streakStore'
import { useCoinsStore } from '../stores/coinsStore'
import { useXPStore } from '../stores/xpStore'
import { useInventoryStore } from '../stores/inventoryStore'
import { useAnalyticsStore } from '../stores/analyticsStore'
import { useMissionsStore } from '../stores/missionsStore'
import { useComboStore } from '../stores/comboStore'

/** Collect serializable state from all 8 stores */
function getAllState(): Record<string, unknown> {
  const user = useUserStore.getState()
  const streak = useStreakStore.getState()
  const coins = useCoinsStore.getState()
  const xp = useXPStore.getState()
  const inventory = useInventoryStore.getState()
  const analytics = useAnalyticsStore.getState()
  const missions = useMissionsStore.getState()
  const combo = useComboStore.getState()

  return {
    user: { name: user.name, theme: user.theme, isOnboarded: user.isOnboarded, avatarConfig: user.avatarConfig },
    streak: { currentStreak: streak.currentStreak, longestStreak: streak.longestStreak, lastLogin: streak.lastLogin },
    coins: { bronze: coins.bronze, silver: coins.silver, gold: coins.gold },
    xp: { totalXP: xp.totalXP },
    inventory: { ownedItems: inventory.ownedItems, equippedOutfit: inventory.equippedOutfit, equippedAccessory: inventory.equippedAccessory, trophies: inventory.trophies },
    analytics: { sessions: analytics.sessions },
    missions: { missions: missions.missions, lastGenerated: missions.lastGenerated, completedMissionDays: missions.completedMissionDays },
    combo: { currentCombo: combo.currentCombo, bestCombo: combo.bestCombo },
  }
}

/** Apply server state to all local stores */
function applyState(gs: Record<string, Record<string, unknown>>) {
  if (gs.user) useUserStore.setState(gs.user)
  if (gs.streak) useStreakStore.setState(gs.streak)
  if (gs.coins) useCoinsStore.setState(gs.coins)
  if (gs.xp) useXPStore.setState(gs.xp)
  if (gs.inventory) useInventoryStore.setState(gs.inventory)
  if (gs.analytics) useAnalyticsStore.setState(gs.analytics)
  if (gs.missions) useMissionsStore.setState(gs.missions)
  if (gs.combo) useComboStore.setState(gs.combo)
}

/** Pull game_state from Supabase → localStorage */
export async function pullState(userId: string): Promise<boolean> {
  if (!supabase) return false
  const { data, error } = await supabase
    .from('profiles')
    .select('game_state')
    .eq('id', userId)
    .single()

  if (error || !data?.game_state) return false
  const gs = data.game_state as Record<string, Record<string, unknown>>
  if (Object.keys(gs).length === 0) return false

  applyState(gs)
  return true
}

/** Push all localStorage state → Supabase */
export async function pushState(userId: string): Promise<boolean> {
  if (!supabase) return false
  const gameState = getAllState()
  const displayName = useUserStore.getState().name

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      display_name: displayName,
      game_state: gameState,
      updated_at: new Date().toISOString(),
    })

  return !error
}
