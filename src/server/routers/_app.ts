import { router } from '../trpc'
import { questionRouter } from './question'
import { testRouter } from './test'
import { progressRouter } from './progress'
import { userRouter } from './user'

export const appRouter = router({
  question: questionRouter,
  test: testRouter,
  progress: progressRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
