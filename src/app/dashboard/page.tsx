'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { trpc } from '@/utils/trpc'
import {
  BookOpen,
  Target,
  TrendingUp,
  Clock,
  Award,
  Bookmark,
  ArrowRight,
  BarChart3,
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const { data: stats, isLoading } = trpc.user.getDashboardStats.useQuery(
    undefined,
    {
      enabled: status === 'authenticated',
    }
  )

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <main className="flex-1 pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Welcome back, {session.user?.name}!
              </h1>
              <p className="text-gray-600 mt-2">
                Track your progress and continue your test preparation
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/practice">
                <Button className="gradient-primary text-white">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Practice
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Questions Attempted</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats?.totalQuestionsAttempted || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Accuracy</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats?.accuracy || 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tests Completed</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats?.completedTests || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Study Streak</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats?.studyStreak || 0} days
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-white">SAT</span>
                  </div>
                  SAT Preparation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Practice for SAT Reading, Writing and Language, and Math sections
                </p>
                <div className="space-y-2">
                  <Link href="/practice?test=SAT&section=Reading">
                    <Button variant="outline" className="w-full justify-between">
                      <span>Reading & Writing</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/practice?test=SAT&section=Math">
                    <Button variant="outline" className="w-full justify-between">
                      <span>Math</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/tests?test=SAT">
                    <Button className="w-full gradient-primary text-white">
                      Full SAT Practice Test
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 gradient-secondary rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-white">IELTS</span>
                  </div>
                  IELTS Preparation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Practice for IELTS Listening, Reading, Writing, and Speaking modules
                </p>
                <div className="space-y-2">
                  <Link href="/practice?test=IELTS&section=Listening">
                    <Button variant="outline" className="w-full justify-between">
                      <span>Listening</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/practice?test=IELTS&section=Reading">
                    <Button variant="outline" className="w-full justify-between">
                      <span>Reading</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/practice?test=IELTS&section=Writing">
                    <Button variant="outline" className="w-full justify-between">
                      <span>Writing</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/tests?test=IELTS">
                    <Button className="w-full gradient-secondary text-white">
                      Full IELTS Practice Test
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/progress">
              <Card className="border-2 card-hover cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">View Progress</h3>
                      <p className="text-sm text-gray-600">
                        Detailed analytics & insights
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/bookmarks">
              <Card className="border-2 card-hover cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Bookmark className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Bookmarks</h3>
                      <p className="text-sm text-gray-600">
                        {stats?.bookmarksCount || 0} saved questions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/resources">
              <Card className="border-2 card-hover cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-violet-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Study Resources</h3>
                      <p className="text-sm text-gray-600">
                        Guides, tips & strategies
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
