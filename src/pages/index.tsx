import { useUser } from '@clerk/nextjs'
import { type NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NewWorkoutPlan } from '../components/NewWorkoutPlan'
import { NewWorkout } from '../components/NewWorkout'
import { api } from '../utils/api'
import Link from 'next/link'

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

      <header className='flex gap-4 px-4 py-2'>
        <NewWorkoutPlan />
        <NewWorkout />
      </header>

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
