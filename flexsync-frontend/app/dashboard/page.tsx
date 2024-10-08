'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Utilisation de useRouter pour la redirection
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import SidebarDashboard from '@/components/SidebarDashboard'

export default function CoachDashboard() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    speciality: "Musculation"
  })
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Vérifier l'état de connexion au chargement de la page
    const loggedInStatus = localStorage.getItem('isLoggedIn')
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true) // Utilisateur connecté
    } else {
      router.push('/login') // Redirection vers la page de connexion si non connecté
    }
  }, [router])

  const students = [
    { id: 1, name: "Alice Martin", age: 28, goal: "Perte de poids" },
    { id: 2, name: "Pierre Durand", age: 35, goal: "Musculation" },
    { id: 3, name: "Sophie Lefebvre", age: 42, goal: "Remise en forme" },
  ]

  const messages = [
    { id: 1, from: "Alice Martin", content: "Bonjour coach, pouvez-vous me donner des conseils pour mon entraînement d'aujourd'hui ?" },
    { id: 2, from: "Pierre Durand", content: "J'ai une question sur mon programme de musculation." },
  ]

  if (!isLoggedIn) {
    return null // Rendre la page vide en attendant la redirection
  }

  return (
    <div className="flex h-screen bg-gray-100">
    <div className="">
        <SidebarDashboard />
      </div>
      {/*
      <div className="w-64 bg-white shadow-md">
        <nav className="mt-6">
          <p className='text-black font-bold pl-2'>Sport</p>
          <a href="#" className="block py-1 px-4 text-gray-700 hover:bg-violet-100 hover:text-violet-600">Programme d'entrainement</a>
          <a href="#" className="block py-1 px-4 text-gray-700 hover:bg-violet-100 hover:text-violet-600">Programme nutrition</a>
          <p className='text-black font-bold pt-4 pl-2'>Administratif</p>
          <a href="#" className="block py-1 px-4 text-gray-700 hover:bg-violet-100 hover:text-violet-600">Statistiques</a>
          <a href="#" className="block py-1 px-4 text-gray-700 hover:bg-violet-100 hover:text-violet-600">Tableau de bord</a>
          <p className='text-black font-bold pt-4 pl-2'>Messagerie</p>
          <a href="#" className="block py-1 px-4 text-gray-700 hover:bg-violet-100 hover:text-violet-600">Chat</a>
          <p className='text-black font-bold pt-4 pl-2'>Aide</p>
          <a href="#" className="block py-1 px-4 text-gray-700 hover:bg-violet-100 hover:text-violet-600">Contactez-nous</a>
          <a href="#" className="block py-1 px-4 text-gray-700 hover:bg-violet-100 hover:text-violet-600">FAQ</a>
        </nav>
      </div>

      <div className="w-64">
        <SidebarDashboard />
      </div>

      <div className="flex-1 p-8">
        <Tabs defaultValue="personal-info" className="w-full">
          <TabsList>
            <TabsTrigger value="personal-info">Informations personnelles</TabsTrigger>
            <TabsTrigger value="students">Mes élèves</TabsTrigger>
            <TabsTrigger value="messages">Messagerie</TabsTrigger>
          </TabsList>

          <TabsContent value="personal-info">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Modifiez vos informations personnelles ici.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" value={personalInfo.name} onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={personalInfo.email} onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" value={personalInfo.phone} onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="speciality">Spécialité</Label>
                  <Input id="speciality" value={personalInfo.speciality} onChange={(e) => setPersonalInfo({...personalInfo, speciality: e.target.value})} />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Enregistrer les modifications</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Mes élèves</CardTitle>
                <CardDescription>Liste de vos élèves actuels.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center space-x-4 mb-4 p-2 hover:bg-gray-100 rounded">
                      <Avatar>
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.age} ans - Objectif : {student.goal}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messagerie instantanée</CardTitle>
                <CardDescription>Communiquez avec vos élèves.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] mb-4">
                  {messages.map((message) => (
                    <div key={message.id} className="mb-4 p-2 bg-gray-100 rounded">
                      <p className="font-medium">{message.from}</p>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex space-x-2">
                  <Input placeholder="Tapez votre message..." />
                  <Button>Envoyer</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      */}
    </div>
  )
}
