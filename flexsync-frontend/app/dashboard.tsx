import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CoachDashboard() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    speciality: "Musculation"
  })

  const students = [
    { id: 1, name: "Alice Martin", age: 28, goal: "Perte de poids" },
    { id: 2, name: "Pierre Durand", age: 35, goal: "Musculation" },
    { id: 3, name: "Sophie Lefebvre", age: 42, goal: "Remise en forme" },
    // Ajoutez plus d'élèves ici
  ]

  const messages = [
    { id: 1, from: "Alice Martin", content: "Bonjour coach, pouvez-vous me donner des conseils pour mon entraînement d'aujourd'hui ?" },
    { id: 2, from: "Pierre Durand", content: "J'ai une question sur mon programme de musculation." },
    // Ajoutez plus de messages ici
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menu latéral */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">Espace Coach</h2>
        </div>
        <nav className="mt-6">
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-violet-100 hover:text-violet-600">Tableau de bord</a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-violet-100 hover:text-violet-600">Calendrier</a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-violet-100 hover:text-violet-600">Statistiques</a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-violet-100 hover:text-violet-600">Paramètres</a>
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-8">
        <Tabs defaultValue="personal-info" className="w-full">
          <TabsList>
            <TabsTrigger value="personal-info">Informations personnelles</TabsTrigger>
            <TabsTrigger value="students">Mes élèves</TabsTrigger>
            <TabsTrigger value="messages">Messagerie</TabsTrigger>
          </TabsList>

          {/* Onglet Informations personnelles */}
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

          {/* Onglet Mes élèves */}
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

          {/* Onglet Messagerie */}
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
    </div>
  )
}