import { type Prisma } from '@prisma/client'
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export type WorkoutsRouter = {
  get: Prisma.WorkoutGetPayload<{
    include: {
      sets: {
        include: {
          exercise: true
        }
      }
      workoutPlan: true
    }
  }>
}

export const workoutsRouter = createTRPCRouter({
  get: protectedProcedure.input(z.string()).query((opts) =>
    opts.ctx.prisma.workout.findFirst({
      where: {
        userId: opts.ctx.user?.id,
        id: opts.input,
      },
      include: {
        sets: {
          include: {
            exercise: true,
          },
        },
        workoutPlan: {
          include: {
            exercises: true,
          },
        },
      },
      // select: {
      //   id: true,
      //   sets: {
      //     include: {
      //       exercise: true,
      //     },
      //   },
      //   workoutPlan: {
      //     select: {
      //       id: true,
      //       name: true,
      //       exercises: true,
      //     },
      //   },
      // },
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
        include: {
          workoutPlan: true,
          sets: true,
        },
      })
    }),
})
