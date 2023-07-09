/* eslint-disable @typescript-eslint/no-floating-promises */

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { type Exercise, type Set } from '@prisma/client'
import { NewSet, type NewSetProps } from './NewSet'
import { TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { X, Edit } from 'lucide-react'
import { useDeleteExerciseSet } from '@/src/hooks/set/useDeleteSet'
import { useState } from 'react'

type SetControlsProps = {
  workoutId: NewSetProps['workoutId']
  exercise: Exercise
  sets: Set[]
}

export const ExerciseSet = ({
  workoutId,
  exercise,
  sets,
}: SetControlsProps) => {
  const { mutate: deleteSet } = useDeleteExerciseSet(workoutId)

  const [editedSet, setEditedSet] = useState<
    Pick<Set, 'id' | 'weight' | 'reps'> | undefined
  >(undefined)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <TableCell className='w-full'>{exercise.name}</TableCell>
      </SheetTrigger>

      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>{exercise.name}</SheetTitle>
        </SheetHeader>

        <ul className='flex flex-col gap-y-4'>
          {sets.map((set) => (
            <li key={set.id}>
              <div className='flex justify-center gap-x-2'>
                <div className='flex basis-1/2 items-baseline justify-end gap-x-1'>
                  <span className='text-xl font-bold'>{set.weight}</span>
                  <span>kg</span>
                </div>
                <span>-</span>
                <div className='flex basis-1/2 items-baseline gap-x-1'>
                  <span className='text-xl font-bold'>{set.reps}</span>
                  <span>reps</span>
                </div>
              </div>

              <div className='mt-1 flex gap-x-4'>
                <Button
                  variant='destructive'
                  className='grow'
                  onClick={() => {
                    deleteSet(set.id)
                    if (set.id === editedSet?.id) setEditedSet(undefined)
                  }}
                >
                  <X />
                </Button>
                <Button
                  className='grow'
                  onClick={() =>
                    setEditedSet({
                      id: set.id,
                      weight: set.weight,
                      reps: set.reps,
                    })
                  }
                >
                  <Edit />
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <NewSet
          exercise={exercise}
          workoutId={workoutId}
          editedSet={editedSet}
          finishEditing={() => setEditedSet(undefined)}
        />
      </SheetContent>
    </Sheet>
  )
}
