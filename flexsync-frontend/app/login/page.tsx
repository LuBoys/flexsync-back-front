'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function CoachLoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Connexion Coach</h2>
          <p className="text-sm text-gray-600">Entrez vos identifiants pour accéder à votre espace coach</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-900">
              Adresse e-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="coach@exemple.com"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-900">
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out"
            disabled={isLoading}
          >
            Se connecter
          </Button>
        </form>
        <div className="text-center">
          <a href="/pwd_forgotten" className="text-sm text-violet-600 hover:underline">
            Mot de passe oublié ?
          </a>
        </div>
        <div className="text-center">
          <a href="/register" className="text-sm text-violet-600 hover:underline">
            Tu n&apos;as pas encore de compte ? Inscris-toi en cliquant ici !
          </a>
        </div>
      </div>
    </div>
  )
}