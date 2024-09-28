'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setIsSuccess(false)
    setIsError(false)

    // Simuler une requête API
    setTimeout(() => {
      if (email.includes('@')) {
        setIsSuccess(true)
      } else {
        setIsError(true)
      }
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Mot de passe oublié</CardTitle>
          <CardDescription className="text-center">
            Entrez votre adresse e-mail pour réinitialiser votre mot de passe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Adresse e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="coach@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button className="w-full bg-violet-600 hover:bg-violet-700" disabled={isLoading}>
                {isLoading && (
                  <span className="spinner-grow spinner-grow-sm text-gray-500" role="status" aria-hidden="true" />
                )}
                Réinitialiser le mot de passe
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-gray-600 mt-4">
            Vous vous souvenez de votre mot de passe ?{' '}
            <a href="/page" className="text-violet-600 hover:underline">
              Retour à la connexion
            </a>
          </p>
        </CardFooter>
      </Card>
      {isSuccess && (
        <Alert className="absolute bottom-4 right-4 w-96 bg-green-100 border-green-500">
          <AlertTitle className="text-green-800">E-mail envoyé</AlertTitle>
          <AlertDescription className="text-green-700">
            Si un compte existe avec cette adresse e-mail, vous recevrez bientôt les instructions pour réinitialiser votre mot de passe.
          </AlertDescription>
        </Alert>
      )}
      {isError && (
        <Alert className="absolute bottom-4 right-4 w-96 bg-red-100 border-red-500">
          <AlertTitle className="text-red-800">Erreur</AlertTitle>
          <AlertDescription className="text-red-700">
            Une erreur s&apos;est produite. Veuillez vérifier votre adresse e-mail et réessayer.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}