import { createTRPCRouter } from '~/server/api/trpc'
import { workoutPlansRouter } from './routers/workoutPlansRouter'
import { exercisesRouter } from './routers/exercisesRouter'
import { workoutsRouter } from './routers/workoutsRouter'
import { setsRouter } from './routers/setsRouter'
import { muscleGroupsRouter } from './routers/muscleGroupsRouter'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  exercises: exercisesRouter,
  workoutPlans: workoutPlansRouter,
  workouts: workoutsRouter,
  sets: setsRouter,
  muscleGroups: muscleGroupsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
