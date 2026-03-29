import { useEffect } from 'react'
import '../hockey-theme.css'

export function useHockeyTheme() {
  useEffect(() => {
    document.documentElement.classList.add('hockey-arena-active')
    return () => {
      document.documentElement.classList.remove('hockey-arena-active')
    }
  }, [])

  return 'hockey-arena'
}
