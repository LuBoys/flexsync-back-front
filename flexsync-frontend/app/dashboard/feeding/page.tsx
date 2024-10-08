// app/dashboard/training/page.js
'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Copy, Pencil } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import SidebarDashboard from '@/components/SidebarDashboard';



const Training = () => {
    const [date, setDate] = useState<Date>()

  const programmes = [
    { id: 1, nom: "Programme de Marie L.", photo: "/marie-l-avatar.jpg" },
    { id: 2, nom: "Programme de Thomas D.", photo: "/thomas-d-avatar.jpg" },
    { id: 3, nom: "Programme de Sophie M.", photo: "/sophie-m-avatar.jpg" },
  ]
  return (
    <div className="flex h-screen">
      <SidebarDashboard />
      <main className="flex-grow p-5">
        <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#9548E2] ">Programme de nutrition</h1>
        <Button className="bg-[#9548E2] hover:bg-violet-700 text-white">
          Créer un programme
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label htmlFor="client-filter" className="text-sm font-medium">
              Filtre par client
            </Label>
            <Select>
              <SelectTrigger id="client-filter">
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les clients</SelectItem>
                <SelectItem value="marie">Marie L.</SelectItem>
                <SelectItem value="thomas">Thomas D.</SelectItem>
                <SelectItem value="sophie">Sophie M.</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor="date-filter" className="text-sm font-medium">
              Filtre par date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "P", { locale: fr }) : <span>Choisir une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button className="self-end bg-[#9548E2] hover:bg-violet-700 text-white">
            Filtrer
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {programmes.map((programme) => (
          <Card key={programme.id} className="p-4">
            <CardContent className="flex items-center justify-between p-0">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={programme.photo} alt={programme.nom} />
                  <AvatarFallback>{programme.nom.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{programme.nom}</span>
              </div>
              <div className="flex space-x-2 ">
                <Button variant="outline" size="sm" className='bg-[#9548E2] text-white hover:bg-[#A42CD6] hover:text-white'>
                  <Copy className="w-4 h-4 mr-2 " />
                  Dupliquer
                </Button>
                <Button variant="outline" size="sm" className='bg-[#9548E2] text-white hover:bg-[#A42CD6] hover:text-white'>
                  <Pencil className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
      </main>
    </div>
  );
};

export default Training;