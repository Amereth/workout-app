import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const setsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        exerciseId: z.string(),
        workoutId: z.string(),
        weight: z.number(),
        reps: z.number(),
      })
    )
    .mutation(
      async ({ ctx, input }) =>
        await ctx.prisma.set.create({
          data: {
            userId: ctx.user.id,
            ...input,
          },
          include: {
            exercise: true,
          },
        })
    ),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        weight: z.number().optional(),
        reps: z.number().optional(),
      })
    )
    .mutation(
      async ({ ctx, input }) =>
        await ctx.prisma.set.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
          },
          include: {
            exercise: true,
          },
        })
    ),

  delete: protectedProcedure.input(z.string()).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma.set.delete({
        where: {
          id: input,
        },
      })
  ),
})
