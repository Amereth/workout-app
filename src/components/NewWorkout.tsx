/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, Form } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { api } from '../utils/api'
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  Sheet,
  SheetClose,
} from '@/components/ui/sheet'
import { useQueryClient } from '@tanstack/react-query'
import { type Workout } from '@prisma/client'
import { getQueryKey } from '@trpc/react-query'

const formSchema = z.object({
  workoutPlan: z.string(),
})

export const NewWorkout = () => {
  const { data: workoutPlans } = api.workoutPlans.getAll.useQuery()

  const queryClient = useQueryClient()

  const workoutsGetAllQueryKey = getQueryKey(
    api.workouts.getAll,
    undefined,
    'query'
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { workoutPlan: undefined },
  })

  const { mutate } = api.workouts.create.useMutation({
    onSuccess(data) {
      queryClient.setQueryData<Workout[]>(workoutsGetAllQueryKey, (old) => {
        if (!old) return old
        return [...old, data] as Workout[]
      })

      form.reset()
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ workoutPlan: values.workoutPlan })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>new workout</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>new workout</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8'>
            <FormField
              control={form.control}
              name='workoutPlan'
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='select a workout plan' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {workoutPlans?.map((workoutPlan) => (
                        <SelectItem key={workoutPlan.id} value={workoutPlan.id}>
                          {workoutPlan.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <SheetFooter className='mt-8 flex justify-end gap-4'>
              <SheetClose asChild>
                <Button type='reset'>cancel</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button type='submit'>create</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
