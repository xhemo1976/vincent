import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMissionsStore, missionRankColors, type MissionRank } from '../../shared/stores/missionsStore'
import { useWeeklyChallengeStore } from '../../shared/stores/weeklyChallengeStore'
import { useXPStore } from '../../shared/stores/xpStore'
import { useCoinsStore } from '../../shared/stores/coinsStore'
import { Card } from '../../shared/components/Card'
import { Button } from '../../shared/components/Button'
import { ProgressBar } from '../../shared/components/ProgressBar'
import { useRewardAnimations } from '../../shared/components/RewardAnimation'
import { getActiveEvent } from '../../shared/utils/seasonalEvents'

function RankBadge({ rank }: { rank: MissionRank }) {
  return (
    <span
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-title text-white text-sm"
      style={{ backgroundColor: missionRankColors[rank] }}
    >
      {rank}
    </span>
  )
}

export default function MissionsPage() {
  const { missions, checkAndGenerate, completeMission } = useMissionsStore()
  const { challenges, checkAndGenerate: checkWeekly, completeChallenge } = useWeeklyChallengeStore()
  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { showCoinGain, showXPGain, AnimationLayer } = useRewardAnimations()
  const activeEvent = getActiveEvent()

  useEffect(() => {
    checkAndGenerate()
    checkWeekly()
  }, [checkAndGenerate, checkWeekly])

  const handleClaim = (missionId: string) => {
    const mission = missions.find((m) => m.id === missionId)
    if (!mission || mission.completed || mission.progress < mission.target) return

    completeMission(missionId)
    addXP(mission.xpReward)
    addCoins(mission.coinReward.type, mission.coinReward.amount)
    showXPGain(mission.xpReward)
    setTimeout(() => {
      showCoinGain(mission.coinReward.type, mission.coinReward.amount)
    }, 300)
  }

  const handleWeeklyClaim = (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId)
    if (!challenge || challenge.completed || challenge.progress < challenge.target) return

    completeChallenge(challengeId)
    addXP(challenge.xpReward)
    addCoins(challenge.coinReward.type, challenge.coinReward.amount)
    showXPGain(challenge.xpReward)
    setTimeout(() => {
      showCoinGain(challenge.coinReward.type, challenge.coinReward.amount)
    }, 300)
  }

  const activeMissions = missions.filter((m) => !m.completed)
  const completedMissions = missions.filter((m) => m.completed)
  const activeChallenges = challenges.filter((c) => !c.completed)
  const completedChallenges = challenges.filter((c) => c.completed)

  return (
    <div>
      <AnimationLayer />
      <h1 className="text-3xl mb-6 text-theme text-center">Missions-Board</h1>

      {/* Seasonal Event Banner */}
      {activeEvent && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card glow className="text-center !p-4">
            <div className="text-3xl mb-1">{activeEvent.emoji}</div>
            <div className="font-title text-lg text-theme">{activeEvent.name}</div>
            <div className="text-xs text-secondary font-body">{activeEvent.description}</div>
            <div className="text-xs font-bold mt-1 font-body" style={{ color: activeEvent.themeColor }}>
              {activeEvent.xpMultiplier}x XP Bonus aktiv!
            </div>
          </Card>
        </motion.div>
      )}

      {/* Weekly Challenges */}
      {activeChallenges.length > 0 && (
        <>
          <h2 className="text-xl mb-3 text-theme neon-text">Wochen-Herausforderungen</h2>
          <div className="space-y-3 mb-8">
            {activeChallenges.map((challenge, i) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="flex items-start gap-3" glow>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-title text-white text-sm bg-gradient-to-br from-purple-500 to-pink-500">
                    W
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-theme text-sm font-body">{challenge.title}</h3>
                    <p className="text-xs text-secondary font-body">{challenge.description}</p>
                    <ProgressBar value={challenge.progress} max={challenge.target} className="mt-2" />
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-primary font-bold font-body">+{challenge.xpReward} XP</span>
                      <span className="text-xs font-body">
                        +{challenge.coinReward.amount} {challenge.coinReward.type === 'gold' ? '🥇' : challenge.coinReward.type === 'silver' ? '🥈' : '🥉'}
                      </span>
                    </div>
                  </div>
                  {challenge.progress >= challenge.target && (
                    <Button size="sm" onClick={() => handleWeeklyClaim(challenge.id)}>Abholen!</Button>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Daily Missions */}
      <h2 className="text-xl mb-3 text-theme">Tages-Missionen</h2>

      {activeMissions.length === 0 && completedMissions.length === 0 && (
        <div className="text-center py-12 text-secondary font-body">
          <div className="text-5xl mb-4">📋</div>
          <p>Keine Missionen verfuegbar. Komm morgen wieder!</p>
        </div>
      )}

      {activeMissions.length > 0 && (
        <div className="space-y-3 mb-8">
          {activeMissions.map((mission, i) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="flex items-start gap-3">
                <RankBadge rank={mission.rank} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-theme text-sm font-body">{mission.title}</h3>
                  <p className="text-xs text-secondary font-body">{mission.description}</p>
                  <ProgressBar
                    value={mission.progress}
                    max={mission.target}
                    className="mt-2"
                  />
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-primary font-bold font-body">
                      +{mission.xpReward} XP
                    </span>
                    <span className="text-xs font-body">
                      +{mission.coinReward.amount} {mission.coinReward.type === 'gold' ? '🥇' : mission.coinReward.type === 'silver' ? '🥈' : '🥉'}
                    </span>
                  </div>
                </div>
                {mission.progress >= mission.target && (
                  <Button
                    size="sm"
                    onClick={() => handleClaim(mission.id)}
                  >
                    Abholen!
                  </Button>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Completed sections */}
      {(completedMissions.length > 0 || completedChallenges.length > 0) && (
        <>
          <h2 className="text-xl mb-3 text-secondary">Abgeschlossen</h2>
          <div className="space-y-2 opacity-60">
            {completedChallenges.map((c) => (
              <Card key={c.id} className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-title text-white text-sm bg-gradient-to-br from-purple-500 to-pink-500">W</span>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-theme line-through font-body">{c.title}</h3>
                </div>
                <span className="text-lg">✅</span>
              </Card>
            ))}
            {completedMissions.map((mission) => (
              <Card key={mission.id} className="flex items-center gap-3">
                <RankBadge rank={mission.rank} />
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-theme line-through font-body">
                    {mission.title}
                  </h3>
                </div>
                <span className="text-lg">✅</span>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
