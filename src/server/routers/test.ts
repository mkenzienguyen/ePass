import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const testRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        testType: z.enum(['SAT', 'IELTS']),
        section: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.testAttempt.create({
        data: {
          userId: ctx.session!.user.id,
          testType: input.testType,
          section: input.section,
          totalQuestions: 0,
          correctAnswers: 0,
          timeSpent: 0,
          startedAt: new Date(),
        },
      })
    }),

  complete: protectedProcedure
    .input(
      z.object({
        testAttemptId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Get all question attempts for this test
      const questionAttempts = await ctx.prisma.questionAttempt.findMany({
        where: { testAttemptId: input.testAttemptId },
      })

      const totalQuestions = questionAttempts.length
      const correctAnswers = questionAttempts.filter((qa) => qa.isCorrect).length
      const timeSpent = questionAttempts.reduce((sum, qa) => sum + qa.timeSpent, 0)
      
      // Calculate score (percentage)
      const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0

      return ctx.prisma.testAttempt.update({
        where: { id: input.testAttemptId },
        data: {
          completedAt: new Date(),
          totalQuestions,
          correctAnswers,
          timeSpent,
          score,
        },
      })
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.testAttempt.findFirst({
        where: {
          id: input.id,
          userId: ctx.session!.user.id,
        },
        include: {
          questionAttempts: {
            include: {
              question: true,
            },
          },
        },
      })
    }),

  getUserTests: protectedProcedure
    .input(
      z.object({
        testType: z.enum(['SAT', 'IELTS']).optional(),
        limit: z.number().min(1).max(50).default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      return ctx.prisma.testAttempt.findMany({
        where: {
          userId: ctx.session!.user.id,
          ...(input.testType && { testType: input.testType }),
        },
        orderBy: { startedAt: 'desc' },
        take: input.limit,
      })
    }),

  getStats: protectedProcedure
    .input(
      z.object({
        testType: z.enum(['SAT', 'IELTS']),
      })
    )
    .query(async ({ input, ctx }) => {
      const tests = await ctx.prisma.testAttempt.findMany({
        where: {
          userId: ctx.session!.user.id,
          testType: input.testType,
          completedAt: { not: null },
        },
        orderBy: { completedAt: 'desc' },
      })

      const totalTests = tests.length
      const avgScore = tests.length > 0
        ? tests.reduce((sum, test) => sum + (test.score || 0), 0) / tests.length
        : 0

      const recentTests = tests.slice(0, 5)
      const improvement = recentTests.length >= 2
        ? (recentTests[0].score || 0) - (recentTests[recentTests.length - 1].score || 0)
        : 0

      return {
        totalTests,
        avgScore: Math.round(avgScore * 10) / 10,
        improvement: Math.round(improvement * 10) / 10,
        recentTests,
      }
    }),
})
