/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { api } from '../utils/api'
import { AddExercisesToWorkoutPlan } from './AddExercisesToWorkoutPlan'
import { ChangeExercisesOrder } from './ChangeExercisesOrder'

const formSchema = z.object({
  name: z.string().min(3, 'min 3 characters').max(50, 'max 50 characters'),
  exercises: z.array(z.string()),
})

export type WorkoutPlanFormSchema = z.infer<typeof formSchema>

export const NewWorkoutPlan = () => {
  const { mutate } = api.workoutPlans.create.useMutation()

  const form = useForm<WorkoutPlanFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', exercises: [] },
  })

  function onSubmit(values: WorkoutPlanFormSchema) {
    mutate(values)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>new workout plan</Button>
      </SheetTrigger>

      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>new workout plan</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-8 flex flex-grow flex-col'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>plan name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='mb-4 mt-6 text-sm font-semibold'>exercises</div>

            <AddExercisesToWorkoutPlan />

            <ChangeExercisesOrder />

            <SheetFooter className='mt-auto'>
              <SheetClose asChild>
                <Button type='submit' className='mt-8'>
                  create
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
