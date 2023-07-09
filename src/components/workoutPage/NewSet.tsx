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
import { useCreateSet } from '@/src/hooks/set/useCreateSet'
import { useUpdateSet } from '@/src/hooks/set/useUpdateSet'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Workout, type Exercise, type Set } from '@prisma/client'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type NewSetProps = {
  workoutId: Workout['id']
  exercise: Exercise
  editedSet?: Pick<Set, 'id' | 'weight' | 'reps'>
  finishEditing: () => void
}

const schema = z.object({
  weight: z.number().nonnegative(),
  reps: z.number().positive().int(),
})

type Schema = z.infer<typeof schema>

const defaultValues = { weight: 0, reps: 0 }

export function NewSet({
  workoutId,
  exercise,
  editedSet,
  finishEditing,
}: NewSetProps) {
  const { mutate: createSet } = useCreateSet({ exercise, workoutId })
  const { mutate: updateSet } = useUpdateSet({ workoutId })

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: editedSet ?? defaultValues,
  })

  useEffect(() => {
    if (editedSet) {
      form.reset(editedSet)
    } else {
      form.reset(defaultValues)
    }
  }, [editedSet])

  const submit = (data: Schema) => {
    editedSet?.id
      ? updateSet({ ...data, id: editedSet.id })
      : createSet({ ...data, workoutId, exerciseId: exercise.id })
    form.reset({ weight: 0, reps: 0 })
    finishEditing()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className='mt-auto flex flex-col items-stretch'
      >
        <div className='flex gap-x-4'>
          <FormField
            control={form.control}
            name='weight'
            render={({ field }) => (
              <FormItem>
                <FormLabel>weight</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='number'
                    className='text-center'
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='reps'
            render={({ field }) => (
              <FormItem>
                <FormLabel>reps</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='number'
                    className='text-center'
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <SheetFooter className='mt-4 flex w-full flex-row gap-4'>
          <Button
            variant='destructive'
            className={clsx('basis-1/2', !editedSet && 'invisible')}
            type='reset'
            onClick={() => {
              form.reset(defaultValues)
              finishEditing()
            }}
          >
            cancel
          </Button>

          <Button className='ml-auto basis-1/2' type='submit'>
            {editedSet ? 'update' : 'add'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  )
}
