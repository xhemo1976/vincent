import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useUserStore } from '../shared/stores/userStore'
import { Layout } from '../shared/components/Layout'

const OnboardingPage = lazy(() => import('../features/onboarding/OnboardingPage'))
const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage'))
const EnglishPage = lazy(() => import('../features/modules/english/EnglishPage'))
const MathPage = lazy(() => import('../features/modules/math/MathPage'))
const HockeyPage = lazy(() => import('../features/modules/hockey/HockeyPage'))
const MemoryPage = lazy(() => import('../features/modules/memory/MemoryPage'))
const HandwritingPage = lazy(() => import('../features/modules/handwriting/HandwritingPage'))
const AiBasicsPage = lazy(() => import('../features/modules/ai-basics/AiBasicsPage'))
const QuizPage = lazy(() => import('../features/modules/quiz/QuizPage'))
const MissionsPage = lazy(() => import('../features/missions/MissionsPage'))
const AvatarPage = lazy(() => import('../features/avatar/AvatarPage'))
const ShopPage = lazy(() => import('../features/avatar/ShopPage'))
const TrophyPage = lazy(() => import('../features/avatar/TrophyPage'))
const BossPage = lazy(() => import('../features/boss/BossPage'))
const SettingsPage = lazy(() => import('../features/dashboard/SettingsPage'))
const MapPage = lazy(() => import('../features/dashboard/MapPage'))
const LoginPage = lazy(() => import('../features/auth/LoginPage'))

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-4xl animate-pulse">🥋</div>
    </div>
  )
}

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const { isOnboarded } = useUserStore()
  if (!isOnboarded) return <Navigate to="/onboarding" replace />
  return <>{children}</>
}

export function AppRouter() {
  const { isOnboarded } = useUserStore()

  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isOnboarded ? '/dashboard' : '/onboarding'} replace />}
          />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <RequireOnboarding>
                <DashboardPage />
              </RequireOnboarding>
            }
          />
          <Route
            path="/module/english"
            element={
              <RequireOnboarding>
                <EnglishPage />
              </RequireOnboarding>
            }
          />
          <Route
            path="/module/math"
            element={
              <RequireOnboarding>
                <MathPage />
              </RequireOnboarding>
            }
          />
          <Route
            path="/module/hockey"
            element={
              <RequireOnboarding>
                <HockeyPage />
              </RequireOnboarding>
            }
          />
          <Route
            path="/module/memory"
            element={
              <RequireOnboarding>
                <MemoryPage />
              </RequireOnboarding>
            }
          />
          <Route
            path="/module/handwriting"
            element={
              <RequireOnboarding>
                <HandwritingPage />
              </RequireOnboarding>
            }
          />
          <Route
            path="/module/ai"
            element={
              <RequireOnboarding>
                <AiBasicsPage />
              </RequireOnboarding>
            }
          />
          <Route
            path="/module/quiz"
            element={
              <RequireOnboarding>
                <QuizPage />
              </RequireOnboarding>
            }
          />
          <Route
            path="/missions"
            element={
              <RequireOnboarding>
                <MissionsPage />
              </RequireOnboarding>
            }
          />
          <Route
            path="/avatar"
            element={
              <RequireOnboarding>
                <AvatarPage />
              </RequireOnboarding>
            }
          />
          <Route
            path="/shop"
            element={
              <RequireOnboarding>
                <ShopPage />
              </RequireOnboarding>
            }
          />
          <Route
            path="/trophies"
            element={
              <RequireOnboarding>
                <TrophyPage />
              </RequireOnboarding>
            }
          />
          <Route
            path="/boss"
            element={
              <RequireOnboarding>
                <BossPage />
              </RequireOnboarding>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireOnboarding>
                <SettingsPage />
              </RequireOnboarding>
            }
          />
          <Route
            path="/map"
            element={
              <RequireOnboarding>
                <MapPage />
              </RequireOnboarding>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
