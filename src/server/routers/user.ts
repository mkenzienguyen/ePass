import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const userRouter = router({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session!.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
      },
    })
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).optional(),
        image: z.string().url().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.session!.user.id },
        data: input,
      })
    }),

  getDashboardStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id

    // Get total questions attempted
    const progress = await ctx.prisma.progress.findMany({
      where: { userId },
    })

    const totalQuestionsAttempted = progress.reduce(
      (sum, p) => sum + p.questionsAttempted,
      0
    )

    const totalQuestionsCorrect = progress.reduce(
      (sum, p) => sum + p.questionsCorrect,
      0
    )

    // Get completed tests count
    const completedTests = await ctx.prisma.testAttempt.count({
      where: {
        userId,
        completedAt: { not: null },
      },
    })

    // Get study streak (days practiced in last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentProgress = await ctx.prisma.progress.findMany({
      where: {
        userId,
        lastPracticed: { gte: sevenDaysAgo },
      },
      select: {
        lastPracticed: true,
      },
    })

    const uniqueDays = new Set(
      recentProgress.map((p) => p.lastPracticed.toISOString().split('T')[0])
    )

    // Get bookmarks count
    const bookmarksCount = await ctx.prisma.bookmark.count({
      where: { userId },
    })

    return {
      totalQuestionsAttempted,
      totalQuestionsCorrect,
      accuracy:
        totalQuestionsAttempted > 0
          ? Math.round((totalQuestionsCorrect / totalQuestionsAttempted) * 100)
          : 0,
      completedTests,
      studyStreak: uniqueDays.size,
      bookmarksCount,
    }
  }),
})
