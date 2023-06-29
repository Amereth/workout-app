import { z } from 'zod'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc'

export const workoutPlansRouter = createTRPCRouter({
  get: protectedProcedure.input(z.string()).query(({ ctx, input }) =>
    ctx.prisma.workoutPlan.findFirst({
      where: {
        userId: ctx.user?.id,
        id: input,
      },
    })
  ),

  getAll: publicProcedure.query((opts) =>
    opts.ctx.prisma.workoutPlan.findMany({
      where: { userId: opts.ctx.user?.id },
      include: { exercises: true },
    })
  ),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        exercises: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        return
      }

      return await ctx.prisma.workoutPlan.create({
        data: {
          name: input.name,
          exercises: {
            connect: input.exercises.map((id) => ({ id })),
          },
          userId: ctx.user.id,
        },
        include: {
          exercises: true,
        },
      })
    }),
})
