/* eslint-disable @typescript-eslint/no-misused-promises */

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { AddExercisesToWorkoutPlan } from '../components/AddExercisesToWorkoutPlan'
import { ExerciseReorderableList } from '../components/ExerciseReorderableList'
import { api } from '../utils/api'
import { usePageHeader } from '../hooks/usePageHeader'
import { useEffect } from 'react'

const formSchema = z.object({
  name: z.string().min(3, 'min 3 characters').max(50, 'max 50 characters'),
  exercises: z.array(z.string()),
})

export type WorkoutPlanFormSchema = z.infer<typeof formSchema>

const NewWorkoutPlan = () => {
  const { mutate } = api.workoutPlans.create.useMutation()
  const [, setHeader] = usePageHeader()

  useEffect(() => {
    setHeader('new workout plan')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const form = useForm<WorkoutPlanFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', exercises: [] },
  })

  function onSubmit(values: WorkoutPlanFormSchema) {
    mutate(values)
  }

  return (
    <>
      <main className='flex grow flex-col overflow-auto'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex grow flex-col'
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

            <ExerciseReorderableList />
          </form>
        </Form>
      </main>

      <footer className='mt-auto p-4 shadow-xl-up'>
        <Button type='submit' className='w-full'>
          create
        </Button>
      </footer>
    </>
  )
}

export default NewWorkoutPlan
