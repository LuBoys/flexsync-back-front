'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Utiliser 'next/navigation' au lieu de 'next/router' pour Next.js 13
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Vérifier l'état de connexion à l'initialisation côté client
      const checkLoginStatus = () => {
        const status = localStorage.getItem('isLoggedIn') === 'true'
        setIsLoggedIn(status)
      }

      checkLoginStatus()
      window.addEventListener('storage', checkLoginStatus)

      return () => {
        window.removeEventListener('storage', checkLoginStatus)
      }
    }
  }, [])

  const handleFastLogin = () => {
    if (typeof window !== 'undefined') {
      // Simuler la connexion rapide
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify({
        name: 'Admin',
        email: 'admin@example.com',
        role: 'admin',
        token: 'fake-jwt-token'
      }))
      setIsLoggedIn(true)
      router.push('/dashboard') // Rediriger vers le dashboard après connexion
    }
  }

 
  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        <Link href="/accueil" legacyBehavior passHref>
          <a className="text-[#7c3aed] font-bold">Logo</a>
        </Link>

        <div className="flex items-center space-x-12 text-[#7c3aed] font-medium">
          <Link href="/accueil" legacyBehavior passHref>
            <a className="hover:text-violet-700 transition duration-200">Accueil</a>
          </Link>
          <Link href="/teams" legacyBehavior passHref>
            <a className="hover:text-violet-700 transition duration-200">Notre équipe</a>
          </Link>

          {!isLoggedIn && (
            <>
              <Link href="/register" legacyBehavior passHref>
                <a className="hover:text-violet-700 transition duration-200">Inscription</a>
              </Link>
              <Link href="/login" legacyBehavior passHref>
                <a className="hover:text-violet-700 transition duration-200">Connexion</a>
              </Link>
              <Button
                variant="ghost"
                className={cn("hover:text-violet-700 cursor-pointer transition duration-200")}
                onClick={handleFastLogin}
              >
                Connexion rapide
              </Button>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link href="/dashboard" legacyBehavior passHref>
                <a className="hover:text-violet-700 transition duration-200">Dashboard</a>
              </Link>
             
            </>
          )}

          
        </div>
      </div>
    </nav>
  )
}
