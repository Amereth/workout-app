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
import { SheetFooter } from '@/components/ui/sheet'
import { api } from '@/src/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Workout, type Exercise } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  weight: z.number(),
  reps: z.number(),
})

export type NewSetProps = {
  workoutId: Workout['id']
  exerciseId: Exercise['id']
}

export function NewSet({ workoutId, exerciseId }: NewSetProps) {
  const { mutate: createSet } = api.sets.create.useMutation()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { weight: 0, reps: 0 },
  })
  const onSubmit = (values: z.infer<typeof formSchema>) =>
    createSet({
      workoutId,
      exerciseId,
      weight: values.weight,
      reps: values.reps,
    })

  const weight = form.watch('weight')
  const reps = form.watch('reps')

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-auto flex flex-col items-center'
      >
        <div className='mt-2 flex items-end justify-center gap-x-4'>
          <Button
            onClick={() =>
              form.setValue('weight', weight - 1 >= 0 ? weight - 1 : 0)
            }
          >
            -
          </Button>

          <FormField
            control={form.control}
            name='weight'
            render={({ field }) => (
              <FormItem className='flex gap-x-4'>
                <div>
                  <FormLabel className='inline-block w-full text-center'>
                    weight
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      type='number'
                      className='text-center'
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className='!mt-0'
            onClick={() => form.setValue('weight', weight + 1)}
          >
            +
          </Button>
        </div>

        <div className='mt-2 flex items-end gap-x-4'>
          <Button
            onClick={() => form.setValue('reps', reps - 1 >= 0 ? reps - 1 : 0)}
          >
            -
          </Button>

          <FormField
            control={form.control}
            name='reps'
            render={({ field }) => (
              <FormItem className='flex gap-x-4'>
                <div>
                  <FormLabel className='inline-block w-full text-center'>
                    reps
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      type='number'
                      className='text-center'
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className='!mt-0'
            onClick={() => form.setValue('reps', reps + 1)}
          >
            +
          </Button>
        </div>

        <SheetFooter className='mt-8 flex flex-row gap-4'>
          <Button type='reset' variant='destructive' className='w-28'>
            clear
          </Button>
          <Button type='submit' variant='constructive' className='w-28'>
            add
          </Button>
        </SheetFooter>
      </form>
    </Form>
  )
}
