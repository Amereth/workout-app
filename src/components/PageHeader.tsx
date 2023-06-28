import { type ReactNode } from 'react'

type PageHeaderProps = {
  children?: ReactNode
}

export const PageHeader = ({ children }: PageHeaderProps) => {
  return <header className='flex gap-4 px-4 py-4 shadow-xl'>{children}</header>
}
