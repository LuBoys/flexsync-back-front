// app/dashboard/contact/page.js


'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import SidebarDashboard from '@/components/SidebarDashboard';

function Contact() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    message: '',
    acceptPolicy: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, acceptPolicy: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Données du formulaire:', formData)
    setIsLoading(false)
    alert('Votre message a été envoyé avec succès!')
    // Réinitialiser le formulaire
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      message: '',
      acceptPolicy: false
    })
  }

  return (
    <div className="flex h-screen ">
      <SidebarDashboard />
      
      <main className="mx-auto p-5">
      <h1 className="text-3xl text-[#9548E2] font-bold mb-8">Contactez-nous</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Un problème ?</CardTitle>
          <p className="text-center text-gray-600 mt-2">
            Pour toute demande auprès de notre S.A.V, contactez-nous via ce formulaire
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                name="telephone"
                type="tel"
                value={formData.telephone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="min-h-[100px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptPolicy"
                checked={formData.acceptPolicy}
                onCheckedChange={handleCheckboxChange}
                required
              />
              <Label htmlFor="acceptPolicy" className="text-sm">
                Vous acceptez notre politique de confidentialité.
              </Label>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white"
            disabled={isLoading || !formData.acceptPolicy}
            onClick={handleSubmit}
          >
            {isLoading ? 'Envoi en cours...' : 'Envoyer'}
          </Button>
        </CardFooter>
      </Card>
      </main>
    </div>

  )
}

export default Contact;