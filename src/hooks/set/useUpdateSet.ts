/* eslint-disable @typescript-eslint/no-floating-promises */

import { type WorkoutsRouter } from '@/src/server/api/routers/workoutsRouter'
import { api } from '@/src/utils/api'
import { type Workout } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { produce } from 'immer'

type UseUpsertSetProps = {
  workoutId: Workout['id']
}

export const useUpdateSet = ({ workoutId }: UseUpsertSetProps) => {
  const queryClient = useQueryClient()
  const workoutsGetQueryKey = getQueryKey(api.workouts.get, workoutId, 'query')

  return api.sets.update.useMutation({
    async onMutate(variables) {
      await queryClient.cancelQueries(workoutsGetQueryKey)

      const previous =
        queryClient.getQueryData<WorkoutsRouter['get']>(workoutsGetQueryKey)

      queryClient.setQueryData<WorkoutsRouter['get']>(
        workoutsGetQueryKey,
        (old) =>
          old &&
          produce(old, (draft) => {
            draft.sets.forEach((set) => {
              if (set.id !== variables.id) return

              if (variables.weight) set.weight = variables.weight
              if (variables.reps) set.reps = variables.reps
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
