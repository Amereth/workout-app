import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const muscleGroupsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.muscleGroup.findMany({
      orderBy: { name: 'asc' },
    })
  ),
})
