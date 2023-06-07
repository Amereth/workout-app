import { Button } from '@/components/ui/button'
import { SignIn, SignInButton, useUser } from '@clerk/nextjs'
import { type NextPage } from 'next'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

const SignInPage: NextPage = () => {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user.isSignedIn) {
      void router.push('/')
    }
  }, [user.isSignedIn, router])

  return (
    <main className='grid h-[100vh] place-content-center'>
      <SignInButton>
        <Button className='button'>Bход</Button>
      </SignInButton>
      <SignIn
        path='/sign-in'
        routing='path'
        signUpUrl='/sign-up'
        afterSignInUrl='/'
      />
    </main>
  )
}

export default SignInPage
