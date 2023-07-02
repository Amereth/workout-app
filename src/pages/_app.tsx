import { ClerkProvider } from '@clerk/nextjs'
import { type AppType } from 'next/app'
import { api } from '~/utils/api'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import '@/styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <ReactQueryDevtools initialIsOpen />

      <Component {...pageProps} />
    </ClerkProvider>
  )
}

export default api.withTRPC(MyApp)
