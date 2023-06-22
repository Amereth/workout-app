import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const exercisesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany()
  }),
})
