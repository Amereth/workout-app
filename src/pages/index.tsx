import { SignIn, SignInButton, useUser } from '@clerk/nextjs'
import { type NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  const user = useUser()

  if (!user.isSignedIn)
    return (
      <main>
        <SignInButton>
          <span className='button'>Bход</span>
        </SignInButton>
        <SignIn path='/sign-in' routing='path' signUpUrl='/sign-up' />
      </main>
    )

  return (
    <>
      <Head>
        <title>We Workout</title>
      </Head>
      <main className='grid h-screen place-content-center text-white'>
        home page
      </main>
    </>
  )
}

export default Home
