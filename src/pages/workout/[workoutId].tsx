/* eslint-disable @typescript-eslint/no-misused-promises */

import { buttonVariants } from '@/components/ui/button'
import { PageHeader } from '@/src/components/PageHeader'
import { api } from '@/src/utils/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { queryParamsToString } from '@/src/utils/queryParamsToString'
import { AddExercise } from '@/src/components/workoutPage/AddExercise'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { SetControls } from '@/src/components/workoutPage/SetControls'

export default function WorkoutPage() {
  const {
    query: { workoutId: workoutIdFromParams = '' },
  } = useRouter()

  const workoutId = queryParamsToString(workoutIdFromParams)

  const { data: workout } = api.workouts.get.useQuery(workoutId, {
    queryKey: ['workouts.get', workoutId],
  })

  if (!workout) return null

  return (
    <>
      <PageHeader>
        <Link href='/' className={buttonVariants({ variant: 'default' })}>
          go home
        </Link>
      </PageHeader>

      <main>
        <AddExercise
          workoutId={workout.id}
          exercises={workout.workoutPlan.exercises}
        />

        <Accordion type='multiple'>
          {workout.exerciseRecords.map((exercise) => (
            <AccordionItem key={exercise.id} value={exercise.id}>
              <AccordionTrigger>{exercise.exercise.name}</AccordionTrigger>
              <AccordionContent>
                <SetControls />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </>
  )
}
