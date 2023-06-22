import { useUser } from '@clerk/nextjs'
import { type NextPage } from 'next'
import Head from 'next/head'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { NewWorkoutPlanDialog } from '../components/NewWorkoutPlanDialog'
import { NewWorkoutDialog } from '../components/NewWorkoutDialog'

const Home: NextPage = () => {
  const newWorkoutPlanDialogRef = useRef<HTMLDialogElement>(null)
  const newWorkoutDialogRef = useRef<HTMLDialogElement>(null)

  const user = useUser()
  const router = useRouter()

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

      <NewWorkoutPlanDialog dialogRef={newWorkoutPlanDialogRef} />
      <NewWorkoutDialog dialogRef={newWorkoutDialogRef} />

      <header className='flex gap-4 px-4 py-2'>
        <Button onClick={() => newWorkoutPlanDialogRef.current?.showModal()}>
          create new workout plan
        </Button>

        <Button onClick={() => newWorkoutDialogRef.current?.showModal()}>
          create new workout
        </Button>
      </header>

      <main className='grid h-screen place-content-center'></main>
    </>
  )
}

export default Home
