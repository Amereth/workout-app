import { useContext } from 'react'
import { HeaderContext } from '../components/PageHeader'

export const usePageHeader = () => useContext(HeaderContext)
