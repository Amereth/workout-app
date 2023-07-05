/* eslint-disable @typescript-eslint/no-floating-promises */

import { type WorkoutsRouter } from '@/src/server/api/routers/workoutsRouter'
import { api } from '@/src/utils/api'
import { type Workout } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { produce } from 'immer'

export const useDeleteExerciseSet = (workoutId: Workout['id']) => {
  const queryClient = useQueryClient()
  const workoutsGetQueryKey = getQueryKey(api.workouts.get, workoutId, 'query')

  return api.sets.delete.useMutation({
    async onMutate(setId) {
      await queryClient.cancelQueries(workoutsGetQueryKey)

      const previous = queryClient.getQueryData(
        workoutsGetQueryKey
      ) as WorkoutsRouter['get']

      queryClient.setQueryData<WorkoutsRouter['get']>(
        workoutsGetQueryKey,
        (old) =>
          old &&
          produce(old, (draft) => {
            draft.sets = draft.sets.filter((set) => set.id !== setId)
          })
      )

      return { previous }
    },

    onError(_error, _variables, context) {
      queryClient.setQueryData<WorkoutsRouter['get']>(
        workoutsGetQueryKey,
        context?.previous
      )
    },

    onSettled() {
      queryClient.invalidateQueries(workoutsGetQueryKey)
    },
  })
}
