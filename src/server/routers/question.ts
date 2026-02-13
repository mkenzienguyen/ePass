import { router, publicProcedure, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const questionRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.question.findUnique({
        where: { id: input.id },
      })
    }),

  getByFilters: publicProcedure
    .input(
      z.object({
        testType: z.enum(['SAT', 'IELTS']),
        section: z.string().optional(),
        difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
        tags: z.array(z.string()).optional(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { testType, section, difficulty, tags, limit, cursor } = input

      const questions = await ctx.prisma.question.findMany({
        where: {
          testType,
          ...(section && { section }),
          ...(difficulty && { difficulty }),
          ...(tags && tags.length > 0 && { tags: { hasSome: tags } }),
        },
        take: limit + 1,
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        orderBy: { createdAt: 'desc' },
      })

      let nextCursor: string | undefined = undefined
      if (questions.length > limit) {
        const nextItem = questions.pop()
        nextCursor = nextItem!.id
      }

      return {
        questions,
        nextCursor,
      }
    }),

  getRandom: publicProcedure
    .input(
      z.object({
        testType: z.enum(['SAT', 'IELTS']),
        section: z.string().optional(),
        difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
        count: z.number().min(1).max(50).default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const { testType, section, difficulty, count } = input

      // Get total count
      const totalCount = await ctx.prisma.question.count({
        where: {
          testType,
          ...(section && { section }),
          ...(difficulty && { difficulty }),
        },
      })

      if (totalCount === 0) return []

      // Generate random skip values
      const randomSkips = Array.from({ length: count }, () =>
        Math.floor(Math.random() * totalCount)
      )

      // Fetch questions at random positions
      const questions = await Promise.all(
        randomSkips.map((skip) =>
          ctx.prisma.question.findFirst({
            where: {
              testType,
              ...(section && { section }),
              ...(difficulty && { difficulty }),
            },
            skip,
          })
        )
      )

      return questions.filter(Boolean)
    }),

  submitAnswer: protectedProcedure
    .input(
      z.object({
        questionId: z.string(),
        testAttemptId: z.string().optional(),
        userAnswer: z.string(),
        timeSpent: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const question = await ctx.prisma.question.findUnique({
        where: { id: input.questionId },
      })

      if (!question) {
        throw new Error('Question not found')
      }

      const isCorrect = question.correctAnswer === input.userAnswer

      // If part of a test attempt, create question attempt
      if (input.testAttemptId) {
        await ctx.prisma.questionAttempt.create({
          data: {
            testAttemptId: input.testAttemptId,
            questionId: input.questionId,
            userAnswer: input.userAnswer,
            isCorrect,
            timeSpent: input.timeSpent,
          },
        })
      }

      // Update user progress
      await ctx.prisma.progress.upsert({
        where: {
          userId_testType_section: {
            userId: ctx.session!.user.id,
            testType: question.testType,
            section: question.section,
          },
        },
        update: {
          questionsAttempted: { increment: 1 },
          questionsCorrect: { increment: isCorrect ? 1 : 0 },
          lastPracticed: new Date(),
        },
        create: {
          userId: ctx.session!.user.id,
          testType: question.testType,
          section: question.section,
          questionsAttempted: 1,
          questionsCorrect: isCorrect ? 1 : 0,
        },
      })

      return {
        isCorrect,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      }
    }),

  bookmark: protectedProcedure
    .input(
      z.object({
        questionId: z.string(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.bookmark.create({
        data: {
          userId: ctx.session!.user.id,
          questionId: input.questionId,
          notes: input.notes,
        },
      })
    }),

  removeBookmark: protectedProcedure
    .input(z.object({ questionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.bookmark.delete({
        where: {
          userId_questionId: {
            userId: ctx.session!.user.id,
            questionId: input.questionId,
          },
        },
      })
    }),

  getBookmarked: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.bookmark.findMany({
      where: { userId: ctx.session!.user.id },
      include: { question: true },
      orderBy: { createdAt: 'desc' },
    })
  }),
})
