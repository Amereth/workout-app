import { useUser } from '@clerk/nextjs'
import { type NextPage } from 'next'
import Head from 'next/head'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
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

      <main className='grid h-screen place-content-center text-white'>{}</main>
    </>
  )
}

export default Home
