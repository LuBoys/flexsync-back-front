'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Simuler une vérification de connexion
  useEffect(() => {
    // Remplacer ceci par votre logique réelle de vérification de connexion
    const checkLoginStatus = () => {
      const status = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(status)
    }

    checkLoginStatus()
    window.addEventListener('storage', checkLoginStatus)

    return () => {
      window.removeEventListener('storage', checkLoginStatus)
    }
  }, [])

  const handleLogout = () => {
    // Remplacer ceci par votre logique réelle de déconnexion
    localStorage.setItem('isLoggedIn', 'false')
    setIsLoggedIn(false)
  }

  return (
    <nav className="bg-white shadow-md py-4 px-6 ">
      <div className="flex items-center justify-between ">
        <Link href="/accueil" legacyBehavior passHref>
          <a className="text-[#7c3aed] font-bold">Logo</a>
        </Link>

        <div className="flex items-center space-x-12 text-[#7c3aed] font-medium">
         
        
                <Link href="/accueil" legacyBehavior passHref>
                  <a className="hover:text-violet-700 transition duration-200">Accueil</a>
                </Link>
                <Link href="/dashboard" legacyBehavior passHref>
                  <a className="hover:text-violet-700 transition duration-200">Test dashboard</a>
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
            </>
          )}
          {isLoggedIn && (
            <>
              <Link href="/dashboard" legacyBehavior passHref>
                <a className="hover:text-violet-700 transition duration-200">Dashboard</a>
              </Link>
              <Button
                variant="ghost"
                className={cn("hover:text-violet-700 cursor-pointer transition duration-200")}
                onClick={handleLogout}
              >
                Déconnexion
              </Button>
            </>
          )}

          <Link href="/contact" legacyBehavior passHref>
            <Button
              variant="outline"
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out"
            >
              Démarrer la discussion
            </Button>
          </Link>
    
        </div>
      </div>
    </nav>
  )
}