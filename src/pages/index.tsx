import { useUser } from '@clerk/nextjs'
import { type NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NewWorkoutPlan } from '../components/NewWorkoutPlan'
import { NewWorkout } from '../components/NewWorkout'
import { api } from '../utils/api'
import Link from 'next/link'
import { PageHeader } from '../components/PageHeader'

const Home: NextPage = () => {
  const user = useUser()
  const router = useRouter()

  const { data: workouts } = api.workouts.getAll.useQuery()

  useEffect(() => {
    if (!user.isSignedIn) {
      void router.push('/signIn')
    }
  }, [user.isSignedIn, router])

  return (
    <>
      <Head>
        <title>We Workout</title>
      </Head>

      <PageHeader>
        <NewWorkoutPlan />
        <NewWorkout />
      </PageHeader>

      <main className='grid h-screen place-content-center'>
        <h2>workouts</h2>
        {workouts?.map((workout) => (
          <Link key={workout.id} href={`workout/${workout.id}`}>
            {workout.workoutPlan.name}
          </Link>
        ))}
      </main>
    </>
  )
}

export default Home
