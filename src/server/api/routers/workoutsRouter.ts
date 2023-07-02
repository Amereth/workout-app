import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const workoutsRouter = createTRPCRouter({
  get: protectedProcedure.input(z.string()).query((opts) =>
    opts.ctx.prisma.workout.findFirst({
      where: {
        userId: opts.ctx.user?.id,
        id: opts.input,
      },
      select: {
        id: true,
        sets: {
          include: {
            exercise: true,
          },
        },
        workoutPlan: {
          select: {
            id: true,
            name: true,
            exercises: true,
          },
        },
      },
    })
  ),

  getAll: protectedProcedure.query((opts) =>
    opts.ctx.prisma.workout.findMany({
      where: { userId: opts.ctx.user?.id },
      include: {
        workoutPlan: {
          include: {
            exercises: true,
          },
        },
        sets: true,
      },
    })
  ),

  create: protectedProcedure
    .input(z.object({ workoutPlan: z.string() }))
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
