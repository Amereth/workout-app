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
import { Button } from '@/components/ui/button'
import { X, Edit } from 'lucide-react'

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
                <Button className='grow'>
                  <Edit />
                </Button>
                <Button variant='destructive' className='grow'>
                  <X />
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <NewSet exerciseId={exercise.id} workoutId={workoutId} />
      </SheetContent>
    </Sheet>
  )
}
