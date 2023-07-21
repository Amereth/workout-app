import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet,
} from '@/components/ui/sheet'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  useEffect,
  type ReactNode,
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { usePageHeader } from '../hooks/usePageHeader'

type PageHeaderProps = {
  children?: ReactNode
}

export const HeaderContext = createContext<
  [string, Dispatch<SetStateAction<string>>]
>(['', () => ''])

export const PageHeader = ({ children }: PageHeaderProps) => {
  const [content] = usePageHeader()
  const [isOpen, setOpen] = useState(false)
  const { pathname } = useRouter()
  const user = useUser()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className='flex items-center gap-4 p-4 shadow-xl'>
      <Button asChild>
        <Link passHref href='/'>
          home
        </Link>
      </Button>

      <h2 className='mx-auto text-lg font-semibold'>{content}</h2>

      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger>
          <Avatar>
            <AvatarImage src={user.user?.profileImageUrl} />
            <AvatarFallback>
              {user.user?.firstName?.[0]} {user.user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>main menu</SheetTitle>
          </SheetHeader>

          <nav className='my-8'>
            <ul className='flex flex-col gap-y-4'>
              <NavLink
                href='new-workout'
                label='new workout'
                onClick={() => setOpen(false)}
              />
              <NavLink
                href='new-workout-plan'
                label='new workout plan'
                onClick={() => setOpen(false)}
              />
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

      {children}
    </header>
  )
}

type NavLinkProps = {
  href: string
  label: string
  onClick: () => void
}

const NavLink = ({ href, label, onClick }: NavLinkProps) => (
  <li>
    <Button
      variant='secondary'
      onClick={onClick}
      className='w-full justify-start'
      asChild
    >
      <Link passHref href={href}>
        {label}
      </Link>
    </Button>
  </li>
)
