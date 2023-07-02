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
import { z } from 'zod'

const formSchema = z.object({
  weight: z.number(),
  reps: z.number(),
})

export function SetControls() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { weight: 0, reps: 0 },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => console.log(values)

  const weight = form.watch('weight')
  const reps = form.watch('reps')

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col items-center'
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
                  <FormLabel className=''>weight</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      type='number'
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
                  <FormLabel className=''>reps</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      type='number'
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

        <div className='mt-4 flex gap-x-4'>
          <Button type='submit' variant='constructive' className='w-40'>
            add
          </Button>
          <Button type='reset' variant='destructive' className='w-40'>
            clear
          </Button>
        </div>
      </form>
    </Form>
  )
}
