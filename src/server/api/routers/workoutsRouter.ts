import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const workoutsRouter = createTRPCRouter({
  get: protectedProcedure.input(z.number()).query((opts) =>
    opts.ctx.prisma.workout.findMany({
      where: {
        userId: opts.ctx.user?.id,
        id: opts.input,
      },
      include: {
        workoutPlan: {
          include: {
            exercises: true,
          },
        },
      },
    })
  ),

  getAll: protectedProcedure.query((opts) =>
    opts.ctx.prisma.workout.findMany({
      where: { userId: opts.ctx.user?.id },
      include: { workoutPlan: true },
    })
  ),

  create: protectedProcedure
    .input(
      z.object({
        workoutPlan: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) return

      return await ctx.prisma.workout.create({
        data: {
          userId: ctx.user.id,
          workoutPlan: {
            connect: { id: input.workoutPlan },
          },
        },
      })
    }),
})
