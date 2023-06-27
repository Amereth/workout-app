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
import { Checkbox } from '@/components/ui/checkbox'
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

const formSchema = z.object({
  name: z.string().min(3, 'min 3 characters').max(50, 'max 50 characters'),
  exercises: z.array(z.number()),
})

export const NewWorkoutPlan = () => {
  const { mutate } = api.workoutPlans.create.useMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', exercises: [] },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }

  const { data: exercises } = api.exercises.getAll.useQuery()

  return (
    <Sheet>
      <SheetTrigger>
        <Button>create workout plan</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>new workout plan</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>workout name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='mt-6 text-sm'>exercises</div>

            <div className='mt-2 flex flex-col gap-4'>
              {exercises?.map((exercise) => (
                <FormField
                  key={exercise.id}
                  control={form.control}
                  name='exercises'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
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
                  )}
                />
              ))}
            </div>

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
