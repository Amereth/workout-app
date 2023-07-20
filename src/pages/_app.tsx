import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type AppType } from 'next/app'
import { PageHeader } from '~/components/PageHeader'
import { api } from '~/utils/api'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <ReactQueryDevtools initialIsOpen />
      <div className='flex flex-col'>
        <PageHeader />

        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  )
}

export default api.withTRPC(MyApp)
