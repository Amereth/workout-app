/* eslint-disable @typescript-eslint/no-misused-promises */

import { buttonVariants } from '@/components/ui/button'
import { PageHeader } from '@/src/components/PageHeader'
import { api } from '@/src/utils/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { queryParamsToString } from '@/src/utils/queryParamsToString'
import { SetList } from '@/src/components/workoutPage/SetList'

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
        {workout.workoutPlan.exercises.map((exercise) => (
          <SetList
            key={exercise.id}
            exercise={exercise}
            workoutId={workout.id}
            sets={workout.sets.filter((set) => set.exerciseId === exercise.id)}
          />
        ))}
      </main>
    </>
  )
}
