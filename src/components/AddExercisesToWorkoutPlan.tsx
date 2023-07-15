import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { type MuscleGroup } from '@prisma/client'
import { create } from 'zustand'
import { api } from '../utils/api'
import { Toggle } from '@/components/ui/toggle'
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { type WorkoutPlanFormSchema } from './NewWorkoutPlan'
import { Checkbox } from '@/components/ui/checkbox'

type MuscleGroupsStore = {
  list: MuscleGroup['id'][]
  toggle: (id: MuscleGroup['id']) => void
}

const useMuscleGroupsStore = create<MuscleGroupsStore>((set) => ({
  list: [],
  toggle: (newId) =>
    set((state) => {
      if (state.list.includes(newId)) {
        return { list: state.list.filter((id) => id !== newId) }
      }
      return { list: [...state.list, newId] }
    }),
}))

export const AddExercisesToWorkoutPlan = () => {
  const { data: exercises } = api.exercises.getAll.useQuery()
  const { data: muscleGroups } = api.muscleGroups.getAll.useQuery()

  const { control } = useFormContext<WorkoutPlanFormSchema>()

  const { list: selectedMuscleGroups, toggle: toggleMuscleGroup } =
    useMuscleGroupsStore()

  const filteredExercises =
    selectedMuscleGroups.length === 0
      ? exercises
      : exercises?.filter((exercise) =>
          exercise.muscleGroups.some((muscleGroup) =>
            selectedMuscleGroups.includes(muscleGroup.id)
          )
        )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>add exercises</Button>
      </SheetTrigger>

      <SheetContent className='flex flex-col overflow-auto'>
        <SheetHeader>
          <SheetTitle>add exercises</SheetTitle>
        </SheetHeader>

        <ul className='mt-8 flex flex-wrap gap-2'>
          {muscleGroups?.map((muscleGroup) => (
            <li key={muscleGroup.id}>
              <Toggle
                size='sm'
                variant='primary'
                pressed={selectedMuscleGroups.includes(muscleGroup.id)}
                onPressedChange={() => toggleMuscleGroup(muscleGroup.id)}
              >
                {muscleGroup.name}
              </Toggle>
            </li>
          ))}
        </ul>

        <FormField
          control={control}
          name='exercises'
          render={({ field }) => (
            <ul className='mt-4 flex flex-col gap-y-4'>
              {filteredExercises?.map((exercise) => (
                <li key={exercise.id}>
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md'>
                    <FormControl>
                      <Checkbox
                        value={exercise.id}
                        checked={field.value.includes(exercise.id)}
                        onCheckedChange={(data) => {
                          if (data) {
                            field.onChange([...field.value, exercise.id])
                            return
                          }
                          field.onChange(
                            field.value.filter((id) => id !== exercise.id)
                          )
                        }}
                      />
                    </FormControl>
                    <FormLabel className='h-full w-full space-y-1 leading-none'>
                      {exercise.name}
                    </FormLabel>
                  </FormItem>
                </li>
              ))}
            </ul>
          )}
        />

        <SheetFooter className='mt-auto'>
          <SheetClose asChild>
            <Button className='mt-8'>finish</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
