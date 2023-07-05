import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SheetFooter } from '@/components/ui/sheet'
import { api } from '@/src/utils/api'
import { type Workout, type Exercise } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { produce } from 'immer'
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

const useStore = create(
  immer<Store>((set) => ({
    weight: 0,
    setWeight: (newWeight) =>
      set((state) => {
        if (newWeight >= 0) return { weight: newWeight }
        return state
      }),

    reps: 0,
    setReps: (newReps) =>
      set((state) => {
        if (newReps >= 0) return { reps: newReps }
        return { reps: state.reps }
      }),

    reset: () => set(() => ({ weight: 0, reps: 0 })),
  }))
)

export function NewSet({ workoutId, exerciseId }: NewSetProps) {
  const queryClient = useQueryClient()

  const { mutate: createSet } = api.sets.create.useMutation({
    onSuccess(data) {
      queryClient.setQueryData<Workout>(
        getQueryKey(api.workouts.get, workoutId, 'query'),
        (old) => {
          if (!old) return old
          return produce(old, (draft) => {
            // FIXME potentially wrong type in prisma / trpc
            draft.sets.push(data)
          })
        }
      )
    },
  })

  const store = useStore()

  function submit() {
    createSet({
      workoutId,
      exerciseId,
      weight: store.weight,
      reps: store.reps,
    })
  }

  return (
    <div className='mt-auto flex flex-col items-center'>
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

      <SheetFooter className='mt-8 flex flex-row gap-4'>
        <Button variant='destructive' className='w-28' onClick={store.reset}>
          clear
        </Button>
        <Button variant='constructive' className='w-28' onClick={submit}>
          add
        </Button>
      </SheetFooter>
    </div>
  )
}
