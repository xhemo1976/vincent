import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../shared/components/Button'
import { Card } from '../../shared/components/Card'
import { AvatarPixi } from '../../shared/components/AvatarPixi'
import { useUserStore, type HairStyle, type SkinTone, type EyeStyle, type AuraColor, type FaceExpression } from '../../shared/stores/userStore'
import { useInventoryStore, SHOP_ITEMS } from '../../shared/stores/inventoryStore'

const HAIR_COLORS = [
  { id: '#2D2B3D', name: 'Schwarz' },
  { id: '#5C3A1E', name: 'Braun' },
  { id: '#DAA520', name: 'Blond' },
  { id: '#CC3333', name: 'Rot' },
  { id: '#4169E1', name: 'Blau' },
  { id: '#9370DB', name: 'Lila' },
  { id: '#E8E8E8', name: 'Silber' },
  { id: '#FF6B35', name: 'Orange' },
  { id: '#2E7D32', name: 'Gruen' },
  { id: '#FF1493', name: 'Pink' },
  { id: '#00CED1', name: 'Tuerkis' },
  { id: '#FFD700', name: 'Gold' },
]

const HAIR_STYLES: { id: HairStyle; name: string; preview: string }[] = [
  { id: 'spiky', name: 'Spiky', preview: '⚡' },
  { id: 'long', name: 'Lang', preview: '🌊' },
  { id: 'short', name: 'Kurz', preview: '✂️' },
  { id: 'mohawk', name: 'Mohawk', preview: '🔥' },
  { id: 'samurai', name: 'Samurai', preview: '⛩️' },
]

const SKIN_TONES: { id: SkinTone; name: string }[] = [
  { id: '#FFDAB9', name: 'Hell' },
  { id: '#F5CBA7', name: 'Mittel' },
  { id: '#D4A574', name: 'Warm' },
  { id: '#A0785A', name: 'Dunkel' },
  { id: '#6B4226', name: 'Tief' },
]

const EYE_STYLES: { id: EyeStyle; name: string; preview: string }[] = [
  { id: 'sharp', name: 'Scharf', preview: '👁️' },
  { id: 'round', name: 'Rund', preview: '🔵' },
  { id: 'narrow', name: 'Schmal', preview: '😎' },
  { id: 'cyber', name: 'Cyber', preview: '🤖' },
]

const AURA_OPTIONS: { id: AuraColor; name: string; color: string }[] = [
  { id: 'none', name: 'Keine', color: 'transparent' },
  { id: 'purple', name: 'Lila', color: '#7C4DFF' },
  { id: 'blue', name: 'Blau', color: '#40C4FF' },
  { id: 'green', name: 'Gruen', color: '#69F0AE' },
  { id: 'red', name: 'Rot', color: '#FF5252' },
  { id: 'gold', name: 'Gold', color: '#FFD740' },
]

const EXPRESSIONS: { id: FaceExpression; name: string; preview: string }[] = [
  { id: 'neutral', name: 'Normal', preview: '😐' },
  { id: 'happy', name: 'Froehlich', preview: '😄' },
  { id: 'determined', name: 'Entschlossen', preview: '😤' },
  { id: 'angry', name: 'Wuetend', preview: '😠' },
  { id: 'surprised', name: 'Ueberrascht', preview: '😮' },
  { id: 'cool', name: 'Cool', preview: '😎' },
]

type Tab = 'hair' | 'face' | 'expression' | 'aura' | 'outfit' | 'accessory'

export default function AvatarPage() {
  const { name, avatarConfig, setAvatarConfig } = useUserStore()
  const { ownedItems, equippedOutfit, equippedAccessory, equipItem } = useInventoryStore()
  const [tab, setTab] = useState<Tab>('hair')

  const ownedOutfits = SHOP_ITEMS.filter(
    (i) => i.category === 'outfit' && ownedItems.includes(i.id)
  )
  const ownedAccessories = SHOP_ITEMS.filter(
    (i) => i.category === 'accessory' && ownedItems.includes(i.id)
  )

  const hairStyle = avatarConfig.hairStyle || 'spiky'
  const skinTone = avatarConfig.skinTone || '#FFDAB9'
  const eyeStyle = avatarConfig.eyeStyle || 'sharp'
  const aura = avatarConfig.aura || 'none'
  const expression = avatarConfig.expression || 'neutral'

  const tabs: { key: Tab; label: string }[] = [
    { key: 'hair', label: '💇 Haare' },
    { key: 'face', label: '👤 Gesicht' },
    { key: 'expression', label: '😄 Ausdruck' },
    { key: 'aura', label: '✨ Aura' },
    { key: 'outfit', label: '👕 Outfit' },
    { key: 'accessory', label: '⚔️ Zubehoer' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl mb-4 text-theme text-center neon-text">Avatar-Editor</h1>

      {/* Avatar Preview with PixiJS effects */}
      <div className="flex justify-center mb-4 relative">
        <AvatarPixi
          hairColor={avatarConfig.hairColor}
          hairStyle={hairStyle}
          skinTone={skinTone}
          eyeStyle={eyeStyle}
          aura={aura}
          expression={expression}
          outfitId={equippedOutfit}
          accessoryId={equippedAccessory}
          size={240}
        />
      </div>

      <p className="text-center text-base text-secondary mb-4 font-body font-bold">{name}</p>

      {/* Tabs - scrollable */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map((t) => (
          <Button
            key={t.key}
            variant={tab === t.key ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setTab(t.key)}
            className="flex-shrink-0 whitespace-nowrap"
          >
            {t.label}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
        >
          {/* === HAIR TAB === */}
          {tab === 'hair' && (
            <div>
              <h3 className="text-lg mb-2 text-theme">Frisur</h3>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {HAIR_STYLES.map((s) => (
                  <Card
                    key={s.id}
                    hoverable
                    onClick={() => setAvatarConfig({ hairStyle: s.id })}
                    className={`!p-3 text-center ${hairStyle === s.id ? 'ring-2 ring-primary neon-glow' : ''}`}
                  >
                    <div className="text-2xl mb-0.5">{s.preview}</div>
                    <div className="text-xs text-theme font-body font-bold">{s.name}</div>
                  </Card>
                ))}
              </div>

              <h3 className="text-lg mb-2 text-theme">Haarfarbe</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {HAIR_COLORS.map((c) => (
                  <Card
                    key={c.id}
                    hoverable
                    onClick={() => setAvatarConfig({ hairColor: c.id })}
                    className={`!p-2 text-center ${avatarConfig.hairColor === c.id ? 'ring-2 ring-primary neon-glow' : ''}`}
                  >
                    <div
                      className="w-8 h-8 rounded-full mx-auto mb-1 border-2 border-white/30"
                      style={{ backgroundColor: c.id, boxShadow: `0 2px 12px ${c.id}88` }}
                    />
                    <div className="text-[10px] text-theme font-body">{c.name}</div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* === FACE TAB === */}
          {tab === 'face' && (
            <div>
              <h3 className="text-lg mb-2 text-theme">Augen</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {EYE_STYLES.map((e) => (
                  <Card
                    key={e.id}
                    hoverable
                    onClick={() => setAvatarConfig({ eyeStyle: e.id })}
                    className={`!p-3 text-center ${eyeStyle === e.id ? 'ring-2 ring-primary neon-glow' : ''}`}
                  >
                    <div className="text-2xl mb-0.5">{e.preview}</div>
                    <div className="text-xs text-theme font-body font-bold">{e.name}</div>
                  </Card>
                ))}
              </div>

              <h3 className="text-lg mb-2 text-theme">Hautton</h3>
              <div className="grid grid-cols-5 gap-2">
                {SKIN_TONES.map((s) => (
                  <Card
                    key={s.id}
                    hoverable
                    onClick={() => setAvatarConfig({ skinTone: s.id })}
                    className={`!p-3 text-center ${skinTone === s.id ? 'ring-2 ring-primary neon-glow' : ''}`}
                  >
                    <div
                      className="w-10 h-10 rounded-full mx-auto mb-1 border-2 border-white/30"
                      style={{ backgroundColor: s.id, boxShadow: `0 2px 8px ${s.id}66` }}
                    />
                    <div className="text-xs text-theme font-body">{s.name}</div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* === EXPRESSION TAB === */}
          {tab === 'expression' && (
            <div>
              <h3 className="text-lg mb-2 text-theme">Gesichtsausdruck</h3>
              <p className="text-sm text-secondary mb-3 font-body">
                Wie soll dein Charakter dreinschauen?
              </p>
              <div className="grid grid-cols-3 gap-3">
                {EXPRESSIONS.map((ex) => (
                  <Card
                    key={ex.id}
                    hoverable
                    onClick={() => setAvatarConfig({ expression: ex.id })}
                    className={`!p-4 text-center ${expression === ex.id ? 'ring-2 ring-primary neon-glow' : ''}`}
                  >
                    <motion.div
                      className="text-4xl mb-1"
                      animate={expression === ex.id ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      {ex.preview}
                    </motion.div>
                    <div className="text-sm text-theme font-body font-bold">{ex.name}</div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* === AURA TAB === */}
          {tab === 'aura' && (
            <div>
              <h3 className="text-lg mb-2 text-theme">Energie-Aura</h3>
              <p className="text-sm text-secondary mb-3 font-body">
                Waehle eine Energie-Aura fuer deinen Charakter!
              </p>
              <div className="grid grid-cols-3 gap-3">
                {AURA_OPTIONS.map((a) => (
                  <Card
                    key={a.id}
                    hoverable
                    onClick={() => setAvatarConfig({ aura: a.id })}
                    className={`!p-4 text-center ${aura === a.id ? 'ring-2 ring-primary neon-glow' : ''}`}
                  >
                    {a.id === 'none' ? (
                      <div className="text-3xl mb-1">❌</div>
                    ) : (
                      <motion.div
                        animate={{
                          boxShadow: [
                            `0 0 8px ${a.color}`,
                            `0 0 24px ${a.color}`,
                            `0 0 8px ${a.color}`,
                          ],
                        }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-14 h-14 rounded-full mx-auto mb-1"
                        style={{ backgroundColor: a.color }}
                      />
                    )}
                    <div className="text-sm text-theme font-body font-bold">{a.name}</div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* === OUTFIT TAB === */}
          {tab === 'outfit' && (
            <div>
              <h3 className="text-lg mb-2 text-theme">Outfits</h3>
              {ownedOutfits.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ownedOutfits.map((item) => (
                    <Card
                      key={item.id}
                      hoverable
                      onClick={() => equipItem(item.id, 'outfit')}
                      className={`!p-4 text-center ${equippedOutfit === item.id ? 'ring-2 ring-primary neon-glow' : ''}`}
                    >
                      <div className="text-3xl mb-1">{item.emoji}</div>
                      <div className="text-sm font-bold text-theme font-body">{item.name}</div>
                      <div className="text-xs text-secondary font-body">{item.description}</div>
                      {equippedOutfit === item.id && (
                        <div className="text-xs text-[var(--color-success)] font-bold mt-1 font-body">Angelegt</div>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center">
                  <p className="text-secondary font-body">Kaufe Outfits im Shop! 🏪</p>
                </Card>
              )}
            </div>
          )}

          {/* === ACCESSORY TAB === */}
          {tab === 'accessory' && (
            <div>
              <h3 className="text-lg mb-2 text-theme">Zubehoer</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Card
                  hoverable
                  onClick={() => equipItem('', 'accessory')}
                  className={`!p-4 text-center ${equippedAccessory === '' ? 'ring-2 ring-primary neon-glow' : ''}`}
                >
                  <div className="text-3xl mb-1">❌</div>
                  <div className="text-sm font-bold text-theme font-body">Keins</div>
                </Card>
                {ownedAccessories.map((item) => (
                  <Card
                    key={item.id}
                    hoverable
                    onClick={() => equipItem(item.id, 'accessory')}
                    className={`!p-4 text-center ${equippedAccessory === item.id ? 'ring-2 ring-primary neon-glow' : ''}`}
                  >
                    <div className="text-3xl mb-1">{item.emoji}</div>
                    <div className="text-sm font-bold text-theme font-body">{item.name}</div>
                    <div className="text-xs text-secondary font-body">{item.description}</div>
                    {equippedAccessory === item.id && (
                      <div className="text-xs text-[var(--color-success)] font-bold mt-1 font-body">Angelegt</div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
