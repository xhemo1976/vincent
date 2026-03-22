import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../shared/components/Button'
import { Card } from '../../shared/components/Card'
import { CoinDisplay } from '../../shared/components/CoinDisplay'
import { useCoinsStore } from '../../shared/stores/coinsStore'
import { useInventoryStore, SHOP_ITEMS, type ItemCategory, type ItemRarity } from '../../shared/stores/inventoryStore'
import { useRewardAnimations } from '../../shared/components/RewardAnimation'

const RARITY_COLORS: Record<ItemRarity, string> = {
  common: '#9CA3AF',
  rare: '#378ADD',
  epic: '#7F77DD',
  legendary: '#FFD700',
}

const RARITY_LABELS: Record<ItemRarity, string> = {
  common: 'Gewöhnlich',
  rare: 'Selten',
  epic: 'Episch',
  legendary: 'Legendär',
}

const CATEGORY_LABELS: Record<ItemCategory, string> = {
  outfit: '👕 Outfits',
  accessory: '✨ Zubehör',
  deco: '🏮 Deko',
}

export default function ShopPage() {
  const [category, setCategory] = useState<ItemCategory>('outfit')
  const { spendCoins } = useCoinsStore()
  const { ownedItems, buyItem } = useInventoryStore()
  const { AnimationLayer } = useRewardAnimations()

  const items = SHOP_ITEMS.filter((i) => i.category === category && i.price.amount > 0)

  const handleBuy = (item: typeof SHOP_ITEMS[0]) => {
    if (ownedItems.includes(item.id)) return
    const success = spendCoins(item.price.type, item.price.amount)
    if (success) {
      buyItem(item.id)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <h1 className="text-3xl mb-2 text-theme text-center">🏪 Dojo-Shop</h1>
      <div className="flex justify-center mb-6">
        <CoinDisplay />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-6">
        {(Object.keys(CATEGORY_LABELS) as ItemCategory[]).map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setCategory(cat)}
            className="flex-1"
          >
            {CATEGORY_LABELS[cat]}
          </Button>
        ))}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, i) => {
          const owned = ownedItems.includes(item.id)
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={owned ? 'opacity-60' : ''}>
                <div className="text-center">
                  {/* Rarity badge */}
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white inline-block mb-2 font-body"
                    style={{ backgroundColor: RARITY_COLORS[item.rarity] }}
                  >
                    {RARITY_LABELS[item.rarity]}
                  </span>
                  <div className="text-4xl mb-1">{item.emoji}</div>
                  <div className="font-bold text-sm text-theme mb-1 font-body">{item.name}</div>
                  <div className="text-xs text-secondary mb-2 font-body">{item.description}</div>

                  {owned ? (
                    <span className="text-xs text-[var(--color-success)] font-bold font-body">✅ Besitzt</span>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleBuy(item)}
                      className="w-full"
                    >
                      {item.price.amount} {item.price.type === 'gold' ? '🥇' : item.price.type === 'silver' ? '🥈' : '🥉'}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
