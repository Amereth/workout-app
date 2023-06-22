/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { type RefObject } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { api } from '../utils/api'
import { Link } from 'lucide-react'

const formSchema = z.object({
  workoutPlan: z.string(),
})

type NewWorkoutDialogProps = {
  dialogRef: RefObject<HTMLDialogElement>
}

export const NewWorkoutDialog = ({ dialogRef }: NewWorkoutDialogProps) => {
  const { data: workoutPlans } = api.workoutPlans.getAll.useQuery()
  console.log('NewWorkoutDialog ~ workoutPlans:', workoutPlans)

  const { mutate } = api.workoutPlans.create.useMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { workoutPlan: undefined },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('onSubmit ~ values:', values)
    // mutate(values)
  }

  return (
    <dialog ref={dialogRef} className='min-w-[20rem] p-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <SelectItem value='12'>{12}</SelectItem>
                    {workoutPlans?.map((workoutPlan) => (
                      <SelectItem
                        className='z-10'
                        key={workoutPlan.id}
                        value={workoutPlan.id.toString()}
                      >
                        {workoutPlan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <footer className='mt-4 flex justify-end gap-x-4'>
            <Button type='reset' onClick={() => dialogRef.current?.close()}>
              cancel
            </Button>
            <Button type='submit'>create</Button>
          </footer>
        </form>
      </Form>
    </dialog>
  )
}
