/* eslint-disable @typescript-eslint/no-misused-promises */

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

type SetControlsProps = {
  workoutId: NewSetProps['workoutId']
  exercise: Exercise
  sets: Set[]
}

export function ExerciseSet({ workoutId, exercise, sets }: SetControlsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <TableCell className='w-full'>{exercise.name}</TableCell>
      </SheetTrigger>

      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>{exercise.name}</SheetTitle>
        </SheetHeader>

        {sets.map((set) => (
          <div key={set.id} className='flex justify-between text-lg'>
            <div className='flex flex-1 gap-x-4'>
              <span>reps</span>
              <span>{set.reps}</span>
            </div>
            <div className='flex flex-1 justify-end gap-x-4'>
              <span>weight</span>
              <span>{set.weight}</span>
            </div>
          </div>
        ))}

        <NewSet exerciseId={exercise.id} workoutId={workoutId} />
      </SheetContent>
    </Sheet>
  )
}
