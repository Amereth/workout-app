/* eslint-disable @typescript-eslint/no-floating-promises */

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SheetFooter } from '@/components/ui/sheet'
import { type WorkoutsRouter } from '@/src/server/api/routers/workoutsRouter'
import { api } from '@/src/utils/api'
import { type Workout, type Exercise } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { produce } from 'immer'
import { z } from 'zod'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type NewSetProps = {
  workoutId: Workout['id']
  exerciseId: Exercise['id']
}

type Store = {
  weight: number
  setWeight: (qty: number) => void
  reps: number
  setReps: (qty: number) => void
  reset: () => void
}

const validate = (value: number) => z.number().min(0).parse(value)

const newSetStore = create(
  immer<Store>((set) => ({
    weight: 0,
    setWeight: (newWeight) =>
      set(() => {
        try {
          validate(newWeight)
          return { weight: newWeight }
        } catch (error) {}
      }),

    reps: 0,
    setReps: (newReps) =>
      set(() => {
        try {
          validate(newReps)
          if (newReps >= 0) return { reps: newReps }
        } catch (error) {}
      }),

    reset: () => set(() => ({ weight: 0, reps: 0 })),
  }))
)

export function NewSet({ workoutId, exerciseId }: NewSetProps) {
  const store = newSetStore()

  const queryClient = useQueryClient()
  const workoutsGetQueryKey = getQueryKey(api.workouts.get, workoutId, 'query')

  const { mutate: createSet } = api.sets.create.useMutation({
    onSuccess(data) {
      queryClient.setQueryData<WorkoutsRouter['create']>(
        workoutsGetQueryKey,
        (old) =>
          old &&
          produce(old, (draft) => {
            draft.sets.push(data)
          })
      )
    },

    onSettled() {
      queryClient.invalidateQueries(workoutsGetQueryKey)
    },
  })

  function submit() {
    createSet({
      workoutId,
      exerciseId,
      weight: store.weight,
      reps: store.reps,
    })
  }

  return (
    <div className='mt-auto flex flex-col items-stretch'>
      <div className='mt-2 text-center'>weight</div>
      <div className='mt-1 flex items-end justify-center gap-x-4'>
        <Button onClick={() => store.setWeight(store.weight - 1)}>-</Button>
        <Input
          value={store.weight}
          onChange={(event) => store.setWeight(Number(event.target.value))}
          type='number'
          className='text-center'
        />
        <Button
          className='!mt-0'
          onClick={() => store.setWeight(store.weight + 1)}
        >
          +
        </Button>
      </div>

      <div className='mt-4 text-center'>reps</div>
      <div className='mt-1 flex items-end gap-x-4'>
        <Button onClick={() => store.setReps(store.reps - 1)}>-</Button>

        <Input
          value={store.reps}
          onChange={(event) => store.setReps(Number(event.target.value))}
          type='number'
          className='text-center'
        />

        <Button className='!mt-0' onClick={() => store.setReps(store.reps + 1)}>
          +
        </Button>
      </div>

      <SheetFooter className='mt-8 flex w-full flex-row gap-4'>
        <Button variant='destructive' className='grow' onClick={store.reset}>
          clear
        </Button>
        <Button variant='constructive' className='grow' onClick={submit}>
          add
        </Button>
      </SheetFooter>
    </div>
  )
}
