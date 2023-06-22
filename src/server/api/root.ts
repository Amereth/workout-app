import { createTRPCRouter } from '~/server/api/trpc'
import { workoutPlansRouter } from './routers/workoutPlans'
import { exercisesRouter } from './routers/exercises'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  exercises: exercisesRouter,
  workoutPlans: workoutPlansRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
