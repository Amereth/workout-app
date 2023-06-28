import { useUser } from '@clerk/nextjs'
import { type NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { NewWorkoutPlan } from '../components/NewWorkoutPlan'
import { NewWorkout } from '../components/NewWorkout'
import { api } from '../utils/api'
import Link from 'next/link'
import { PageHeader } from '../components/PageHeader'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

const Home: NextPage = () => {
  const user = useUser()
  const router = useRouter()

  const { data: workouts } = api.workouts.getAll.useQuery()

  useEffect(() => {
    if (!user.isSignedIn) {
      void router.push('/signIn')
    }
  }, [user.isSignedIn, router])

  const formatter = useRef(
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    })
  ).current

  return (
    <>
      <Head>
        <title>We Workout</title>
      </Head>

      <PageHeader>
        <NewWorkoutPlan />
        <NewWorkout />
      </PageHeader>

      <main>
        <Table>
          <TableBody>
            {workouts?.map((workout) => (
              <Link key={workout.id} href={`workout/${workout.id}`}>
                <TableRow>
                  <TableCell>{workout.workoutPlan.name}</TableCell>
                  <TableCell>{formatter.format(workout.createdAt)}</TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  )
}

export default Home
