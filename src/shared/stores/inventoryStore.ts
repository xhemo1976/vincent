import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary'
export type ItemCategory = 'outfit' | 'accessory' | 'deco'

export interface ShopItem {
  id: string
  name: string
  emoji: string
  category: ItemCategory
  rarity: ItemRarity
  price: { type: 'bronze' | 'silver' | 'gold'; amount: number }
  description: string
}

export const SHOP_ITEMS: ShopItem[] = [
  // === Outfits (10) ===
  { id: 'gi-white', name: 'Weisser Gi', emoji: '🥋', category: 'outfit', rarity: 'common', price: { type: 'bronze', amount: 0 }, description: 'Standard-Trainingsanzug' },
  { id: 'gi-blue', name: 'Blauer Gi', emoji: '🥋', category: 'outfit', rarity: 'common', price: { type: 'bronze', amount: 20 }, description: 'Trainingsanzug in Blau' },
  { id: 'gi-green', name: 'Gruener Gi', emoji: '🥋', category: 'outfit', rarity: 'common', price: { type: 'bronze', amount: 25 }, description: 'Natur-Trainingsanzug' },
  { id: 'gi-red', name: 'Roter Gi', emoji: '🥋', category: 'outfit', rarity: 'rare', price: { type: 'silver', amount: 5 }, description: 'Feuer-Trainingsanzug' },
  { id: 'gi-purple', name: 'Lila Gi', emoji: '🥋', category: 'outfit', rarity: 'rare', price: { type: 'silver', amount: 6 }, description: 'Schatten-Trainingsanzug' },
  { id: 'gi-black', name: 'Schwarzer Gi', emoji: '🥋', category: 'outfit', rarity: 'rare', price: { type: 'silver', amount: 8 }, description: 'Ninja-Anzug' },
  { id: 'gi-gold', name: 'Goldener Gi', emoji: '🥋', category: 'outfit', rarity: 'epic', price: { type: 'silver', amount: 15 }, description: 'Legendaerer goldener Anzug' },
  { id: 'gi-cyber', name: 'Cyber-Ruestung', emoji: '🤖', category: 'outfit', rarity: 'epic', price: { type: 'gold', amount: 2 }, description: 'Futuristische Kampfruestung' },
  { id: 'gi-dragon', name: 'Drachen-Ruestung', emoji: '🐉', category: 'outfit', rarity: 'legendary', price: { type: 'gold', amount: 3 }, description: 'Nur fuer wahre Meister' },
  { id: 'gi-phoenix', name: 'Phoenix-Mantel', emoji: '🔥', category: 'outfit', rarity: 'legendary', price: { type: 'gold', amount: 5 }, description: 'Aus Asche wiedergeboren' },

  // === Accessories (12) ===
  { id: 'band-red', name: 'Rotes Stirnband', emoji: '🎀', category: 'accessory', rarity: 'common', price: { type: 'bronze', amount: 10 }, description: 'Zeigt Kampfgeist' },
  { id: 'band-blue', name: 'Blaues Stirnband', emoji: '💙', category: 'accessory', rarity: 'common', price: { type: 'bronze', amount: 10 }, description: 'Kuehler Kopf' },
  { id: 'band-black', name: 'Schwarzes Stirnband', emoji: '🖤', category: 'accessory', rarity: 'rare', price: { type: 'silver', amount: 3 }, description: 'Mysterioes und cool' },
  { id: 'glasses', name: 'Weisheits-Brille', emoji: '🤓', category: 'accessory', rarity: 'common', price: { type: 'bronze', amount: 15 }, description: '+10 Intelligenz-Look' },
  { id: 'necklace', name: 'Jade-Amulett', emoji: '📿', category: 'accessory', rarity: 'rare', price: { type: 'silver', amount: 5 }, description: 'Schuetzt den Traeger' },
  { id: 'sword', name: 'Uebungsschwert', emoji: '⚔️', category: 'accessory', rarity: 'rare', price: { type: 'silver', amount: 8 }, description: 'Holzschwert fuer Training' },
  { id: 'shield', name: 'Dojo-Schild', emoji: '🛡️', category: 'accessory', rarity: 'rare', price: { type: 'silver', amount: 7 }, description: 'Verteidigung ist die beste Attacke' },
  { id: 'cape', name: 'Helden-Umhang', emoji: '🦸', category: 'accessory', rarity: 'epic', price: { type: 'silver', amount: 12 }, description: 'Weht dramatisch im Wind' },
  { id: 'wings', name: 'Engelfluegel', emoji: '🪽', category: 'accessory', rarity: 'epic', price: { type: 'gold', amount: 2 }, description: 'Himmlische Kraft' },
  { id: 'crown', name: 'Dojo-Krone', emoji: '👑', category: 'accessory', rarity: 'legendary', price: { type: 'gold', amount: 5 }, description: 'Die Krone des Dojo-Meisters' },
  { id: 'mask-fox', name: 'Fuchs-Maske', emoji: '🦊', category: 'accessory', rarity: 'epic', price: { type: 'silver', amount: 10 }, description: 'Geist des Fuchses' },
  { id: 'mask-oni', name: 'Oni-Maske', emoji: '👹', category: 'accessory', rarity: 'legendary', price: { type: 'gold', amount: 4 }, description: 'Schrecke deine Feinde' },

  // === Deco (10) ===
  { id: 'plant', name: 'Bonsai-Baum', emoji: '🌳', category: 'deco', rarity: 'common', price: { type: 'bronze', amount: 15 }, description: 'Bringt Ruhe ins Dojo' },
  { id: 'lantern', name: 'Laterne', emoji: '🏮', category: 'deco', rarity: 'common', price: { type: 'bronze', amount: 12 }, description: 'Erhellt den Raum' },
  { id: 'bamboo', name: 'Bambus-Brunnen', emoji: '🎋', category: 'deco', rarity: 'common', price: { type: 'bronze', amount: 18 }, description: 'Beruhigendes Wasserspiel' },
  { id: 'candle', name: 'Meditations-Kerze', emoji: '🕯️', category: 'deco', rarity: 'common', price: { type: 'bronze', amount: 8 }, description: 'Fuer innere Ruhe' },
  { id: 'scroll', name: 'Weisheits-Rolle', emoji: '📜', category: 'deco', rarity: 'rare', price: { type: 'silver', amount: 4 }, description: 'Alte Weisheiten' },
  { id: 'katana-stand', name: 'Katana-Staender', emoji: '🗡️', category: 'deco', rarity: 'rare', price: { type: 'silver', amount: 6 }, description: 'Ehrenplatz fuer dein Schwert' },
  { id: 'bell', name: 'Tempel-Glocke', emoji: '🔔', category: 'deco', rarity: 'rare', price: { type: 'silver', amount: 5 }, description: 'Klang der Erleuchtung' },
  { id: 'trophy-gold', name: 'Goldener Pokal', emoji: '🏆', category: 'deco', rarity: 'epic', price: { type: 'gold', amount: 2 }, description: 'Zeichen des Sieges' },
  { id: 'dragon-statue', name: 'Drachen-Statue', emoji: '🐲', category: 'deco', rarity: 'epic', price: { type: 'gold', amount: 3 }, description: 'Waechter des Dojos' },
  { id: 'sakura', name: 'Kirschblueten-Baum', emoji: '🌸', category: 'deco', rarity: 'legendary', price: { type: 'gold', amount: 4 }, description: 'Ewige Bluetenpracht' },
]

export interface Trophy {
  id: string
  name: string
  emoji: string
  description: string
  condition: string
  earned: boolean
  earnedAt?: string
}

const TROPHY_DEFS: Omit<Trophy, 'earned' | 'earnedAt'>[] = [
  // Streak
  { id: 't-first-login', name: 'Erster Schritt', emoji: '👣', description: 'Betrete das Dojo', condition: 'first-login' },
  { id: 't-streak-3', name: 'Bestaendig', emoji: '🔥', description: '3 Tage Streak', condition: 'streak-3' },
  { id: 't-streak-7', name: 'Unaufhaltsam', emoji: '⚡', description: '7 Tage Streak', condition: 'streak-7' },
  { id: 't-streak-14', name: 'Eiserner Wille', emoji: '🔩', description: '14 Tage Streak', condition: 'streak-14' },
  { id: 't-streak-30', name: 'Legende', emoji: '🌟', description: '30 Tage Streak', condition: 'streak-30' },

  // XP
  { id: 't-xp-100', name: 'Lernender', emoji: '📖', description: '100 XP gesammelt', condition: 'xp-100' },
  { id: 't-xp-500', name: 'Fleissig', emoji: '📚', description: '500 XP gesammelt', condition: 'xp-500' },
  { id: 't-xp-1000', name: 'Gelehrter', emoji: '🎓', description: '1000 XP gesammelt', condition: 'xp-1000' },
  { id: 't-xp-2500', name: 'Meisterschueler', emoji: '🏅', description: '2500 XP gesammelt', condition: 'xp-2500' },
  { id: 't-xp-5000', name: 'Weiser', emoji: '🧙', description: '5000 XP gesammelt', condition: 'xp-5000' },
  { id: 't-xp-10000', name: 'Erleuchteter', emoji: '💎', description: '10000 XP gesammelt', condition: 'xp-10000' },

  // Combo
  { id: 't-combo-5', name: 'Combo-Starter', emoji: '✨', description: '5er Combo erreicht', condition: 'combo-5' },
  { id: 't-combo-10', name: 'Combo-Koenig', emoji: '💫', description: '10er Combo erreicht', condition: 'combo-10' },
  { id: 't-combo-20', name: 'Combo-Legende', emoji: '🔥', description: '20er Combo erreicht', condition: 'combo-20' },
  { id: 't-combo-50', name: 'Combo-Gott', emoji: '🌀', description: '50er Combo erreicht', condition: 'combo-50' },

  // Boss
  { id: 't-boss-1', name: 'Bossbezwinger', emoji: '🐉', description: 'Ersten Boss besiegt', condition: 'boss-1' },
  { id: 't-boss-3', name: 'Drachenjaeger', emoji: '🗡️', description: '3 Bosse besiegt', condition: 'boss-3' },
  { id: 't-boss-all', name: 'Unbesiegbar', emoji: '⚔️', description: 'Alle Bosse besiegt', condition: 'boss-all' },

  // Module
  { id: 't-all-modules', name: 'Allrounder', emoji: '🌍', description: 'Alle Module besucht', condition: 'all-modules' },
  { id: 't-vocab-50', name: 'Wortschatz-Held', emoji: '📝', description: '50 Vokabeln gelernt', condition: 'vocab-50' },
  { id: 't-vocab-100', name: 'Sprachmeister', emoji: '🗣️', description: '100 Vokabeln gelernt', condition: 'vocab-100' },
  { id: 't-math-perfect', name: 'Rechenkuenstler', emoji: '🧮', description: '10/10 in Mathe', condition: 'math-perfect' },
  { id: 't-quiz-perfect', name: 'Quiz-Champion', emoji: '🏆', description: '10/10 im Quiz', condition: 'quiz-perfect' },
  { id: 't-grammar-master', name: 'Grammatik-Meister', emoji: '📐', description: 'Alle Grammatik-Kategorien geschafft', condition: 'grammar-master' },

  // Shop
  { id: 't-first-buy', name: 'Erster Einkauf', emoji: '🛒', description: 'Erstes Item gekauft', condition: 'first-buy' },
  { id: 't-collector', name: 'Sammler', emoji: '🎁', description: '10 Items gesammelt', condition: 'collector-10' },
  { id: 't-rich', name: 'Goldjunge', emoji: '💰', description: 'Erstes Gold ausgegeben', condition: 'spent-gold' },
]

interface InventoryState {
  ownedItems: string[]
  equippedOutfit: string
  equippedAccessory: string
  trophies: Trophy[]
  buyItem: (itemId: string) => void
  equipItem: (itemId: string, category: ItemCategory) => void
  initTrophies: () => void
  earnTrophy: (trophyId: string) => void
  checkTrophyCondition: (condition: string) => boolean
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      ownedItems: ['gi-white'],
      equippedOutfit: 'gi-white',
      equippedAccessory: '',
      trophies: TROPHY_DEFS.map((t) => ({ ...t, earned: false })),
      buyItem: (itemId) =>
        set((state) => ({
          ownedItems: state.ownedItems.includes(itemId)
            ? state.ownedItems
            : [...state.ownedItems, itemId],
        })),
      equipItem: (itemId, category) => {
        if (category === 'outfit') set({ equippedOutfit: itemId })
        else if (category === 'accessory') set({ equippedAccessory: itemId })
      },
      initTrophies: () => {
        const { trophies } = get()
        if (trophies.length < TROPHY_DEFS.length) {
          const existing = new Set(trophies.map((t) => t.id))
          const newTrophies = TROPHY_DEFS.filter((t) => !existing.has(t.id)).map((t) => ({ ...t, earned: false }))
          set({ trophies: [...trophies, ...newTrophies] })
        }
      },
      earnTrophy: (trophyId) =>
        set((state) => ({
          trophies: state.trophies.map((t) =>
            t.id === trophyId && !t.earned
              ? { ...t, earned: true, earnedAt: new Date().toISOString() }
              : t
          ),
        })),
      checkTrophyCondition: (condition) => {
        const { trophies } = get()
        return trophies.some((t) => t.condition === condition && t.earned)
      },
    }),
    { name: 'shin-dojo-inventory' }
  )
)
