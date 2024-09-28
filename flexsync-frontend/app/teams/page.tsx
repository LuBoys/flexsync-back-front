'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const teamMembers = [
  {
    name: "Sophie Dubois",
    role: "Co-fondatrice & CEO",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Sophie est une entrepreneure passionnée avec plus de 10 ans d'expérience dans l'industrie du fitness. Elle a fondé FlexSync avec la vision de révolutionner la façon dont les coachs interagissent avec leurs clients.",
    expertise: ["Leadership", "Stratégie d'entreprise", "Innovation produit"],
    linkedin: "https://www.linkedin.com/in/sophiedubois"
  },
  {
    name: "Thomas Martin",
    role: "Co-fondateur & CTO",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Thomas est un développeur full-stack chevronné avec une passion pour les technologies de pointe. Il dirige l'équipe technique de FlexSync, veillant à ce que notre plateforme soit toujours à la pointe de l'innovation.",
    expertise: ["Développement web", "Architecture logicielle", "IA et apprentissage automatique"],
    linkedin: "https://www.linkedin.com/in/thomasmartin"
  },
  {
    name: "Emma Lefèvre",
    role: "Directrice Marketing",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Emma apporte une riche expérience en marketing digital et en croissance des startups. Elle est responsable de la stratégie de marque de FlexSync et de son expansion sur de nouveaux marchés.",
    expertise: ["Marketing digital", "Stratégie de contenu", "Analyse de données"],
    linkedin: "https://www.linkedin.com/in/emmalefèvre"
  },
  {
    name: "Lucas Moreau",
    role: "Chef de Produit",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Lucas travaille en étroite collaboration avec notre communauté de coachs et d'utilisateurs pour s'assurer que FlexSync répond toujours à leurs besoins. Son expérience en tant qu'ancien coach sportif est inestimable pour notre équipe.",
    expertise: ["Gestion de produit", "UX/UI Design", "Recherche utilisateur"],
    linkedin: "https://www.linkedin.com/in/lucasmoreau"
  },
  {
    name: "Chloé Petit",
    role: "Responsable du Support Client",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Chloé dirige notre équipe de support client, veillant à ce que chaque utilisateur de FlexSync reçoive une assistance de premier ordre. Son approche empathique et sa connaissance approfondie du produit font d'elle un atout précieux pour notre équipe.",
    expertise: ["Service client", "Formation", "Résolution de problèmes"],
    linkedin: "https://www.linkedin.com/in/chloepetit"
  },
  {
    name: "Antoine Dupont",
    role: "Ingénieur en IA",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Antoine est notre expert en intelligence artificielle, travaillant sur l'intégration de fonctionnalités d'IA avancées dans FlexSync. Son travail permet d'offrir des recommandations personnalisées et des insights précieux à nos utilisateurs.",
    expertise: ["Intelligence artificielle", "Apprentissage automatique", "Analyse de données sportives"],
    linkedin: "https://www.linkedin.com/in/antoinedupont"
  }
]
type TeamMember = {
    name: string;
    role: string;
    image: string;
    bio: string;
    expertise: string[];
    linkedin: string;
  };
  

  export default function NotreEquipe() {
    // Utiliser le type TeamMember ou null pour l'état
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Notre Équipe</h1>
          <p className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto">
            Découvrez les visages derrière FlexSync. Notre équipe passionnée travaille sans relâche pour révolutionner 
            l&apos;industrie du coaching sportif et vous offrir la meilleure expérience possible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <CardDescription className="text-center">{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4 text-gray-600 line-clamp-3">{member.bio}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setSelectedMember(member)}>
                        En savoir plus
                      </Button>
                    </DialogTrigger>
                    {selectedMember && selectedMember.name === member.name && (
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>{selectedMember.name}</DialogTitle>
                          <DialogDescription>{selectedMember.role}</DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <p className="mb-4 text-gray-600">{selectedMember.bio}</p>
                          <h4 className="font-semibold mb-2">Expertise :</h4>
                          <ul className="list-disc pl-5 mb-4">
                            {selectedMember.expertise.map((skill, skillIndex) => (
                              <li key={skillIndex}>{skill}</li>
                            ))}
                          </ul>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => window.open(selectedMember.linkedin, '_blank')}
                          >
                            Voir le profil LinkedIn
                          </Button>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }