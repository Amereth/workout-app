import { useUser } from '@clerk/nextjs'
import { type NextPage } from 'next'
import Head from 'next/head'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { NewWorkoutPlanDialog } from '../components/NewWorkoutPlanDialog'

const Home: NextPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)
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

      <NewWorkoutPlanDialog dialogRef={dialogRef} />

      <header className='px-4 py-2'>
        <Button
          onClick={() => {
            dialogRef.current?.showModal()
          }}
        >
          create new workout plan
        </Button>
      </header>

      <main className='grid h-screen place-content-center'></main>
    </>
  )
}

export default Home
