/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { Button } from '@/components/ui/button'
import {
  FormField,
  FormItem,
  FormControl,
  Form,
  FormMessage,
} from '@/components/ui/form'
import { api } from '@/src/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { type Exercise, type Workout } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'

const formSchema = z.object({
  exerciseId: z.string(),
})

export const AddExercise = ({
  workoutId,
  exercises,
}: {
  workoutId: Workout['id']
  exercises: Exercise[]
}) => {
  const { mutate } = api.workouts.addExercise.useMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { exerciseId: undefined },
  })

  const client = useQueryClient()

  const onSubmit = ({ exerciseId }: z.infer<typeof formSchema>) =>
    mutate(
      { workoutId, exerciseId },
      {
        onSuccess() {
          client.invalidateQueries(['workouts.get', workoutId])
        },
      }
    )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-8 flex w-full gap-x-4'
      >
        <FormField
          control={form.control}
          name='exerciseId'
          render={({ field }) => (
            <FormItem className='flex-grow'>
              <Select
                onValueChange={field.onChange}
                value={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='select an exercise' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {exercises.map((exercise) => (
                    <SelectItem key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>add exercise</Button>
      </form>
    </Form>
  )
}
