import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const progressRouter = router({
  getOverview: protectedProcedure
    .input(
      z.object({
        testType: z.enum(['SAT', 'IELTS']),
      })
    )
    .query(async ({ input, ctx }) => {
      const progress = await ctx.prisma.progress.findMany({
        where: {
          userId: ctx.session!.user.id,
          testType: input.testType,
        },
      })

      const totalAttempted = progress.reduce(
        (sum, p) => sum + p.questionsAttempted,
        0
      )
      const totalCorrect = progress.reduce((sum, p) => sum + p.questionsCorrect, 0)
      const overallAccuracy =
        totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0

      return {
        sections: progress,
        totalAttempted,
        totalCorrect,
        overallAccuracy: Math.round(overallAccuracy * 10) / 10,
      }
    }),

  getBySection: protectedProcedure
    .input(
      z.object({
        testType: z.enum(['SAT', 'IELTS']),
        section: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return ctx.prisma.progress.findUnique({
        where: {
          userId_testType_section: {
            userId: ctx.session!.user.id,
            testType: input.testType,
            section: input.section,
          },
        },
      })
    }),

  getWeakAreas: protectedProcedure
    .input(
      z.object({
        testType: z.enum(['SAT', 'IELTS']),
      })
    )
    .query(async ({ input, ctx }) => {
      const progress = await ctx.prisma.progress.findMany({
        where: {
          userId: ctx.session!.user.id,
          testType: input.testType,
        },
        orderBy: {
          averageScore: 'asc',
        },
        take: 3,
      })

      return progress
    }),

  getStrengths: protectedProcedure
    .input(
      z.object({
        testType: z.enum(['SAT', 'IELTS']),
      })
    )
    .query(async ({ input, ctx }) => {
      const progress = await ctx.prisma.progress.findMany({
        where: {
          userId: ctx.session!.user.id,
          testType: input.testType,
        },
        orderBy: {
          averageScore: 'desc',
        },
        take: 3,
      })

      return progress
    }),

  getRecentActivity: protectedProcedure
    .input(
      z.object({
        days: z.number().min(1).max(90).default(30),
      })
    )
    .query(async ({ input, ctx }) => {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - input.days)

      const attempts = await ctx.prisma.questionAttempt.findMany({
        where: {
          testAttempt: {
            userId: ctx.session!.user.id,
          },
          createdAt: {
            gte: startDate,
          },
        },
        include: {
          question: {
            select: {
              testType: true,
              section: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      // Group by date
      const activityByDate = attempts.reduce((acc, attempt) => {
        const date = attempt.createdAt.toISOString().split('T')[0]
        if (!acc[date]) {
          acc[date] = {
            date,
            total: 0,
            correct: 0,
          }
        }
        acc[date].total++
        if (attempt.isCorrect) acc[date].correct++
        return acc
      }, {} as Record<string, { date: string; total: number; correct: number }>)

      return Object.values(activityByDate).sort((a, b) =>
        a.date.localeCompare(b.date)
      )
    }),
})
