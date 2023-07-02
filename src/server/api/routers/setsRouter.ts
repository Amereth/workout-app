import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const setsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        weight: z.number(),
        reps: z.number(),
        exerciseId: z.string(),
        workoutId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.set.create({
        data: {
          userId: ctx.user.id,
          weight: input.weight,
          reps: input.reps,
          workoutId: input.workoutId,
          exerciseId: input.exerciseId,
        },
      })
    }),
})
