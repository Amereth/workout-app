import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type AppType } from 'next/app'
import { useState } from 'react'
import { HeaderContext, PageHeader } from '~/components/PageHeader'
import { api } from '~/utils/api'

const MyApp: AppType = ({ Component, pageProps }) => {
  const [headerContent, setHeaderContent] = useState('')

  return (
    <ClerkProvider>
      <HeaderContext.Provider value={[headerContent, setHeaderContent]}>
        <ReactQueryDevtools initialIsOpen />
        <div className='flex h-full flex-col'>
          <PageHeader />

          <Component {...pageProps} />
        </div>
      </HeaderContext.Provider>
    </ClerkProvider>
  )
}

export default api.withTRPC(MyApp)
