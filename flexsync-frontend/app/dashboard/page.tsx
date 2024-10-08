'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Utilisation de useRouter pour la redirection
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import SidebarDashboard from '@/components/SidebarDashboard'
import { Calendar } from "@/components/ui/calendar"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Bell, Calendar as CalendarIcon, Home, Users, Dumbbell, Settings, LogOut } from 'lucide-react'


const stats = [
  { label: 'Clients actifs', value: '24' },
  { label: 'Séances cette semaine', value: '18' },
  { label: 'Taux de complétion', value: '87%' },
  { label: 'Nouveaux clients', value: '3' },
]

const activities = [
  { user: 'Marie L.', action: 'a complété son entraînement', time: 'Il y a 5 min' },
  { user: 'Thomas D.', action: 'a commencé un nouveau programme', time: 'Il y a 2h' },
  { user: 'Sophie M.', action: 'a atteint son objectif mensuel', time: 'Il y a 1j' },
]

const progressData = [
  { name: 'Lun', progress: 65 },
  { name: 'Mar', progress: 70 },
  { name: 'Mer', progress: 80 },
  { name: 'Jeu', progress: 75 },
  { name: 'Ven', progress: 85 },
  { name: 'Sam', progress: 90 },
  { name: 'Dim', progress: 88 },
]

export default function Dashboard() {
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
  const [date, setDate] = useState<Date | undefined>(new Date())
const [personalInfo, setPersonalInfo] = useState({
    name: "Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    speciality: "Musculation"
  })
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="">
        <SidebarDashboard />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Bonjour, coach {personalInfo.name}</h1>
            <p className="text-gray-600">Voici un aperçu de votre journée</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/avatar.png" alt="Coach" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Calendar and Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Calendrier</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Progression hebdomadaire</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Activités récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {activities.map((activity, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{activity.user} {activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}