/* eslint-disable @typescript-eslint/no-misused-promises */
import { useUser } from '@clerk/nextjs'
import { type NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { api } from '../utils/api'
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

      <main>
        <Table>
          <TableBody>
            {workouts?.map((workout) => (
              <TableRow
                key={workout.id}
                onClick={() => router.push(`/workout/${workout.id}`)}
                className='cursor-pointer'
              >
                <TableCell>{workout.workoutPlan.name}</TableCell>
                <TableCell>{formatter.format(workout.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  )
}

export default Home
