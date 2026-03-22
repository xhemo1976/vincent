import { motion } from 'framer-motion'
import { Card } from '../../shared/components/Card'
import { useInventoryStore } from '../../shared/stores/inventoryStore'

export default function TrophyPage() {
  const { trophies } = useInventoryStore()

  const earned = trophies.filter((t) => t.earned)
  const locked = trophies.filter((t) => !t.earned)

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl mb-2 text-theme text-center">🏆 Trophäen-Zimmer</h1>
      <p className="text-secondary text-center mb-6 font-body">
        {earned.length} von {trophies.length} freigeschaltet
      </p>

      {/* Trophy grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {earned.map((trophy, i) => (
          <motion.div
            key={trophy.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05, type: 'spring' }}
          >
            <Card className="text-center !p-3">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                className="text-3xl mb-1"
              >
                {trophy.emoji}
              </motion.div>
              <div className="text-[10px] font-bold text-theme font-body">{trophy.name}</div>
              <div className="text-[9px] text-secondary font-body">{trophy.description}</div>
            </Card>
          </motion.div>
        ))}

        {locked.map((trophy) => (
          <Card key={trophy.id} className="text-center !p-3 opacity-40">
            <div className="text-3xl mb-1">🔒</div>
            <div className="text-[10px] font-bold text-secondary font-body">{trophy.name}</div>
            <div className="text-[9px] text-secondary font-body">{trophy.description}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}
