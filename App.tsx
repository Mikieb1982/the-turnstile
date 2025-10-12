import React, { useMemo, useState } from 'react'
import Header from './src/components/Header'
import OnboardingScreen from './src/components/OnboardingScreen'
import TeamSelection from './src/components/TeamSelection'
import MobileBottomBar from './src/components/MobileBottomBar'
import MyNextMatchCard from './src/components/MyNextMatchCard'
import RecentResultsCarousel from './src/components/RecentResultsCarousel'
import QuickStats from './src/components/QuickStats'
import MatchdayView from './src/components/MatchdayView'
import ProfileView from './src/components/ProfileView'
import LeagueTableView from './src/components/LeagueTableView'
import type { FixtureSummary, LeagueTableRow, QuickStat, RecentResult, TeamBranding } from './src/types/ui'

type Stage = 'welcome' | 'team-selection' | 'app'
type View = 'home' | 'fixtures' | 'table' | 'community' | 'profile'

const TEAMS: TeamBranding[] = [
  {
    id: 'skyhawks',
    name: 'Skyline Hawks',
    nickname: 'Skyhawks',
    abbreviation: 'SKH',
    primaryColor: '#38BDF8',
    secondaryColor: '#0EA5E9',
    gradient: 'linear-gradient(135deg,#38BDF8,#0EA5E9)',
  },
  {
    id: 'ironclads',
    name: 'Ironclad Lions',
    nickname: 'Lions',
    abbreviation: 'ICL',
    primaryColor: '#F87171',
    secondaryColor: '#B91C1C',
    gradient: 'linear-gradient(135deg,#F87171,#B91C1C)',
  },
  {
    id: 'stormriders',
    name: 'Storm Riders',
    nickname: 'Storm',
    abbreviation: 'STR',
    primaryColor: '#A855F7',
    secondaryColor: '#7C3AED',
    gradient: 'linear-gradient(135deg,#A855F7,#7C3AED)',
  },
  {
    id: 'harborwolves',
    name: 'Harbor Wolves',
    nickname: 'Wolves',
    abbreviation: 'HBW',
    primaryColor: '#FACC15',
    secondaryColor: '#F97316',
    gradient: 'linear-gradient(135deg,#FACC15,#F97316)',
  },
  {
    id: 'mountainforge',
    name: 'Mountain Forge',
    nickname: 'Forge',
    abbreviation: 'MTF',
    primaryColor: '#4ADE80',
    secondaryColor: '#16A34A',
    gradient: 'linear-gradient(135deg,#4ADE80,#16A34A)',
  },
  {
    id: 'metrobolts',
    name: 'Metro Bolts',
    nickname: 'Bolts',
    abbreviation: 'MBT',
    primaryColor: '#F472B6',
    secondaryColor: '#DB2777',
    gradient: 'linear-gradient(135deg,#F472B6,#DB2777)',
  },
  {
    id: 'glacierbears',
    name: 'Glacier Bears',
    nickname: 'Bears',
    abbreviation: 'GLB',
    primaryColor: '#60A5FA',
    secondaryColor: '#1D4ED8',
    gradient: 'linear-gradient(135deg,#60A5FA,#1D4ED8)',
  },
  {
    id: 'emberfoxes',
    name: 'Ember Foxes',
    nickname: 'Foxes',
    abbreviation: 'EBF',
    primaryColor: '#FB7185',
    secondaryColor: '#F43F5E',
    gradient: 'linear-gradient(135deg,#FB7185,#F43F5E)',
  },
  {
    id: 'riverknights',
    name: 'River Knights',
    nickname: 'Knights',
    abbreviation: 'RVK',
    primaryColor: '#34D399',
    secondaryColor: '#059669',
    gradient: 'linear-gradient(135deg,#34D399,#059669)',
  },
  {
    id: 'desertvipers',
    name: 'Desert Vipers',
    nickname: 'Vipers',
    abbreviation: 'DSV',
    primaryColor: '#FBBF24',
    secondaryColor: '#D97706',
    gradient: 'linear-gradient(135deg,#FBBF24,#D97706)',
  },
  {
    id: 'coastaldynamos',
    name: 'Coastal Dynamos',
    nickname: 'Dynamos',
    abbreviation: 'CDY',
    primaryColor: '#38BDF8',
    secondaryColor: '#0EA5E9',
    gradient: 'linear-gradient(135deg,#38BDF8,#0EA5E9)',
  },
  {
    id: 'citadels',
    name: 'Capital Citadels',
    nickname: 'Citadels',
    abbreviation: 'CIT',
    primaryColor: '#FDE68A',
    secondaryColor: '#F59E0B',
    gradient: 'linear-gradient(135deg,#FDE68A,#F59E0B)',
  },
]

const FIXTURES: FixtureSummary[] = [
  {
    id: 'fx1',
    round: 'Round 1',
    date: 'Feb 28',
    time: '7:30 PM',
    stadium: 'National Stadium',
    homeTeamId: 'skyhawks',
    awayTeamId: 'ironclads',
    status: 'UPCOMING',
  },
  {
    id: 'fx2',
    round: 'Round 1',
    date: 'Mar 02',
    time: '5:00 PM',
    stadium: 'Harbor Gate',
    homeTeamId: 'harborwolves',
    awayTeamId: 'stormriders',
    status: 'UPCOMING',
  },
  {
    id: 'fx3',
    round: 'Round 1',
    date: 'Mar 03',
    time: '6:15 PM',
    stadium: 'Forge Arena',
    homeTeamId: 'mountainforge',
    awayTeamId: 'riverknights',
    status: 'UPCOMING',
  },
  {
    id: 'fx4',
    round: 'Round 2',
    date: 'Mar 09',
    time: '7:45 PM',
    stadium: 'Metro Dome',
    homeTeamId: 'metrobolts',
    awayTeamId: 'glacierbears',
    status: 'UPCOMING',
  },
  {
    id: 'fx5',
    round: 'Round 2',
    date: 'Mar 10',
    time: '4:00 PM',
    stadium: 'Ember Field',
    homeTeamId: 'emberfoxes',
    awayTeamId: 'desertvipers',
    status: 'UPCOMING',
  },
  {
    id: 'fx6',
    round: 'Round 2',
    date: 'Mar 11',
    time: '7:15 PM',
    stadium: 'Coastal Arena',
    homeTeamId: 'coastaldynamos',
    awayTeamId: 'citadels',
    status: 'UPCOMING',
  },
  {
    id: 'fx7',
    round: 'Round 3',
    date: 'Mar 16',
    time: '7:30 PM',
    stadium: 'National Stadium',
    homeTeamId: 'ironclads',
    awayTeamId: 'harborwolves',
    status: 'FINAL',
    homeScore: 28,
    awayScore: 22,
  },
  {
    id: 'fx8',
    round: 'Round 3',
    date: 'Mar 17',
    time: '6:00 PM',
    stadium: 'Forge Arena',
    homeTeamId: 'mountainforge',
    awayTeamId: 'skyhawks',
    status: 'FINAL',
    homeScore: 18,
    awayScore: 24,
  },
]

const RECENT_RESULTS: RecentResult[] = [
  { id: 'rr1', homeTeamId: 'ironclads', awayTeamId: 'harborwolves', homeScore: 28, awayScore: 22, date: 'Feb 18' },
  { id: 'rr2', homeTeamId: 'mountainforge', awayTeamId: 'skyhawks', homeScore: 18, awayScore: 24, date: 'Feb 12' },
  { id: 'rr3', homeTeamId: 'desertvipers', awayTeamId: 'riverknights', homeScore: 16, awayScore: 20, date: 'Feb 09' },
  { id: 'rr4', homeTeamId: 'coastaldynamos', awayTeamId: 'stormriders', homeScore: 22, awayScore: 22, date: 'Feb 05' },
  { id: 'rr5', homeTeamId: 'glacierbears', awayTeamId: 'emberfoxes', homeScore: 32, awayScore: 18, date: 'Feb 01' },
]

const QUICK_STATS: QuickStat[] = [
  { id: 'attended', label: 'Total Matches Attended', value: '12', helper: '3 logged this season' },
  { id: 'grounds', label: 'Unique Grounds Visited', value: '5', helper: 'Add 2 for a badge' },
  { id: 'badges', label: 'Badges Earned', value: '8', helper: 'Next: Away Day Streak' },
]

const TABLE_ROWS: LeagueTableRow[] = [
  {
    position: 1,
    teamId: 'skyhawks',
    played: 6,
    wins: 5,
    draws: 0,
    losses: 1,
    pointsFor: 168,
    pointsAgainst: 110,
    pointsDifference: 58,
    totalPoints: 15,
    form: ['W', 'W', 'W', 'L', 'W'],
  },
  {
    position: 2,
    teamId: 'ironclads',
    played: 6,
    wins: 4,
    draws: 1,
    losses: 1,
    pointsFor: 156,
    pointsAgainst: 130,
    pointsDifference: 26,
    totalPoints: 13,
    form: ['W', 'D', 'W', 'W', 'L'],
  },
  {
    position: 3,
    teamId: 'harborwolves',
    played: 6,
    wins: 4,
    draws: 0,
    losses: 2,
    pointsFor: 148,
    pointsAgainst: 132,
    pointsDifference: 16,
    totalPoints: 12,
    form: ['L', 'W', 'W', 'W', 'W'],
  },
  {
    position: 4,
    teamId: 'stormriders',
    played: 6,
    wins: 3,
    draws: 2,
    losses: 1,
    pointsFor: 144,
    pointsAgainst: 138,
    pointsDifference: 6,
    totalPoints: 11,
    form: ['D', 'W', 'L', 'W', 'D'],
  },
  {
    position: 5,
    teamId: 'mountainforge',
    played: 6,
    wins: 3,
    draws: 1,
    losses: 2,
    pointsFor: 140,
    pointsAgainst: 136,
    pointsDifference: 4,
    totalPoints: 10,
    form: ['W', 'L', 'W', 'D', 'L'],
  },
  {
    position: 6,
    teamId: 'riverknights',
    played: 6,
    wins: 2,
    draws: 2,
    losses: 2,
    pointsFor: 128,
    pointsAgainst: 129,
    pointsDifference: -1,
    totalPoints: 8,
    form: ['D', 'W', 'L', 'W', 'L'],
  },
]

export default function App() {
  const [stage, setStage] = useState<Stage>('welcome')
  const [selectedTeamId, setSelectedTeamId] = useState<string>('skyhawks')
  const [favoriteTeamId, setFavoriteTeamId] = useState<string>()
  const [currentView, setCurrentView] = useState<View>('home')
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>({})

  const teamsById = useMemo(() => Object.fromEntries(TEAMS.map((team) => [team.id, team])), [])

  const favoriteTeam = favoriteTeamId ? teamsById[favoriteTeamId] : undefined

  const upcomingForFavorite = useMemo(() => {
    if (!favoriteTeamId) return undefined
    return FIXTURES.find(
      (fixture) =>
        fixture.status === 'UPCOMING' && (fixture.homeTeamId === favoriteTeamId || fixture.awayTeamId === favoriteTeamId),
    )
  }, [favoriteTeamId])

  const nextFixture = upcomingForFavorite ?? FIXTURES[0]
  const homeTeam = teamsById[nextFixture.homeTeamId]
  const awayTeam = teamsById[nextFixture.awayTeamId]

  const attendedIds = useMemo(() => new Set(Object.entries(attendanceMap).filter(([, value]) => value).map(([id]) => id)), [
    attendanceMap,
  ])

  const handleConfirmTeam = () => {
    setFavoriteTeamId(selectedTeamId)
    setStage('app')
  }

  const handleLogAttendance = (fixtureId: string) => {
    setAttendanceMap((prev) => ({ ...prev, [fixtureId]: !prev[fixtureId] }))
  }

  const homeView = (
    <div className="flex flex-col gap-8">
      <MyNextMatchCard
        fixture={nextFixture}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        isLogged={Boolean(attendanceMap[nextFixture.id])}
        onLogAttendance={() => handleLogAttendance(nextFixture.id)}
      />
      <RecentResultsCarousel results={RECENT_RESULTS} teamsById={teamsById} />
      <QuickStats stats={QUICK_STATS} />
    </div>
  )

  const fixturesView = (
    <MatchdayView
      fixtures={FIXTURES}
      teamsById={teamsById}
      attendedIds={attendedIds}
      onToggleAttendance={handleLogAttendance}
    />
  )

  const tableView = <LeagueTableView rows={TABLE_ROWS} teamsById={teamsById} favoriteTeamId={favoriteTeamId} />

  const profileView = favoriteTeam ? (
    <ProfileView userName="John S" joinDate="Jan 2023" favoriteTeam={favoriteTeam} stats={QUICK_STATS} />
  ) : null

  const communityView = (
    <section className="rounded-[2rem] border border-border/60 bg-surface/80 p-6 text-text">
      <h2 className="text-2xl font-semibold text-text-strong">Community</h2>
      <p className="mt-2 text-sm text-text-subtle">
        Share away day stories, swap badge tips, and follow fellow supporters. Community features are coming soon.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border/50 bg-surface-alt/70 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-text-subtle/80">Fan Spotlight</p>
          <p className="mt-2 text-sm text-text">
            Hear from travelling supporters about their match day rituals and favourite grounds.
          </p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-surface-alt/70 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-text-subtle/80">Badge Leaderboard</p>
          <p className="mt-2 text-sm text-text">
            Track who is leading the badge chase and what milestones you can unlock next.
          </p>
        </div>
      </div>
    </section>
  )

  if (stage === 'welcome') {
    return <OnboardingScreen onSignIn={() => setStage('team-selection')} onGuest={() => setStage('team-selection')} />
  }

  if (stage === 'team-selection') {
    return (
      <TeamSelection
        teams={TEAMS}
        selectedTeamId={selectedTeamId}
        onSelect={setSelectedTeamId}
        onConfirm={handleConfirmTeam}
        onBack={() => setStage('welcome')}
      />
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-text">
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/background.png"
          alt="Floodlit stadium"
          className="h-full w-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.35),transparent_70%)]" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-background/80 to-background" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col pb-16 md:pb-0">
        <Header
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          userName="John S"
          favoriteTeam={favoriteTeam}
        />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-6 pb-24 md:pb-10">
          {currentView === 'home' && homeView}
          {currentView === 'fixtures' && fixturesView}
          {currentView === 'table' && tableView}
          {currentView === 'community' && communityView}
          {currentView === 'profile' && profileView}
        </main>
        <footer className="border-t border-border/60 bg-surface/80 py-4 text-center text-xs text-text-subtle/80">
          © {new Date().getFullYear()} The Turnstile. Built for rugby league die-hards, powered by live match feeds.
        </footer>
      </div>

      <MobileBottomBar currentView={currentView} onNavigate={setCurrentView} />
    </div>
  )
}
