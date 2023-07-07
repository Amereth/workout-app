/* eslint-disable @typescript-eslint/no-floating-promises */

import { type WorkoutsRouter } from '@/src/server/api/routers/workoutsRouter'
import { api } from '@/src/utils/api'
import { useUser } from '@clerk/nextjs'
import { type Exercise, type Workout } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { produce } from 'immer'
import { useId } from 'react'

type UseCreateSetProps = {
  workoutId: Workout['id']
  exercise: Exercise
}

export const useCreateSet = ({ exercise, workoutId }: UseCreateSetProps) => {
  const newSetId = useId()
  const user = useUser()

  const queryClient = useQueryClient()
  const workoutsGetQueryKey = getQueryKey(api.workouts.get, workoutId, 'query')

  return api.sets.create.useMutation({
    async onMutate(variables) {
      await queryClient.cancelQueries(workoutsGetQueryKey)

      const previous =
        queryClient.getQueryData<WorkoutsRouter['get']>(workoutsGetQueryKey)

      queryClient.setQueryData<WorkoutsRouter['get']>(
        workoutsGetQueryKey,
        (old) =>
          old &&
          produce(old, (draft) => {
            draft.sets.push({
              ...variables,
              id: newSetId,
              userId: user.user?.id ?? '',
              exerciseId: exercise.id,
              exercise,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
          })
      )

      return { previous }
    },

    onError(_error, _variables, context) {
      queryClient.setQueryData(workoutsGetQueryKey, context?.previous)
    },

    onSettled() {
      queryClient.invalidateQueries(workoutsGetQueryKey)
    },
  })
}
