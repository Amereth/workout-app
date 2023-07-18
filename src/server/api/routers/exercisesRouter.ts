import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const exercisesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.exercise.findMany({
      include: {
        muscleGroups: true,
      },
    })
  ),
})
