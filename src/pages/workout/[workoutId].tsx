/* eslint-disable @typescript-eslint/no-misused-promises */

import { buttonVariants } from '@/components/ui/button'
import { PageHeader } from '@/src/components/PageHeader'
import { api } from '@/src/utils/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { queryParamsToString } from '@/src/utils/queryParamsToString'
import { ExerciseSet } from '@/src/components/workoutPage/ExerciseSet'
import { Table, TableBody, TableRow } from '@/components/ui/table'

export default function WorkoutPage() {
  const {
    query: { workoutId: workoutIdFromParams = '' },
  } = useRouter()

  const workoutId = queryParamsToString(workoutIdFromParams)

  const { data: workout } = api.workouts.get.useQuery(workoutId)

  if (!workout) return null

  return (
    <>
      <PageHeader>
        <Link href='/' className={buttonVariants({ variant: 'default' })}>
          go home
        </Link>
      </PageHeader>

      <main>
        <Table>
          <TableBody>
            {workout.workoutPlan.exercises.map((exercise) => (
              <TableRow key={exercise.id}>
                <ExerciseSet
                  exercise={exercise}
                  workoutId={workout.id}
                  sets={workout.sets.filter(
                    (set) => set.exerciseId === exercise.id
                  )}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  )
}
