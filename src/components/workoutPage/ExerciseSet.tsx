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
              <div className='flex h-10 justify-between text-2xl'>
                <div className='flex basis-1/2 justify-between'>
                  <div>reps</div>
                  <div>{set.reps}</div>
                </div>

                <div className='mx-4 w-[2px] self-stretch bg-black' />

                <div className='flex basis-1/2 justify-between'>
                  <div>{set.weight}</div>
                  <div>weight</div>
                </div>
              </div>

              <div className='mt-2 flex gap-x-4'>
                <Button
                  variant='destructive'
                  className='grow'
                  onClick={() => deleteSet(set.id)}
                >
                  <X />
                </Button>
                <Button className='grow'>
                  <Edit />
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <NewSet exercise={exercise} workoutId={workoutId} />
      </SheetContent>
    </Sheet>
  )
}
