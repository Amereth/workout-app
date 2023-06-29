/* eslint-disable @typescript-eslint/no-misused-promises */

import { buttonVariants } from '@/components/ui/button'
import { PageHeader } from '@/src/components/PageHeader'
import { api } from '@/src/utils/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { queryParamsToString } from '@/src/utils/queryParamsToString'
import { AddExercise } from '@/src/components/workoutPage/AddExercise'

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
        {workout.exerciseRecords.map((exercise) => (
          <div key={exercise.id}>{exercise.exercise.name}</div>
        ))}
        <AddExercise
          workoutId={workout.id}
          exercises={workout.workoutPlan.exercises}
        />
      </main>
    </>
  )
}
