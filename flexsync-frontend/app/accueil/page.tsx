'use client'

import { useRef, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function QuEstCeQueFlexSync() {
  const sectionRefs = {
    presentation: useRef<HTMLDivElement>(null),
    fonctionnalites: useRef<HTMLDivElement>(null),
    temoignages: useRef<HTMLDivElement>(null),
    tarifs: useRef<HTMLDivElement>(null),
  }

  const [openModal, setOpenModal] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])

  {/*const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  */}
  const features = [
    {
      title: "Planification d'entraînements",
      description: "Créez et partagez des programmes d'entraînement personnalisés avec vos élèves.",
      icon: "📅",
      details: "Notre outil de planification d'entraînements vous permet de créer des programmes sur mesure pour chaque client. Vous pouvez définir des exercices spécifiques, des séries, des répétitions, et même ajouter des notes personnalisées. Les clients peuvent accéder à leur programme à tout moment via l'application mobile ou le site web, et marquer les séances comme terminées pour un suivi en temps réel.",
      features: [
        "Création de programmes hebdomadaires ou mensuels",
        "Bibliothèque d'exercices intégrée",
        "Possibilité d'ajouter des vidéos démonstratives",
        "Notifications de rappel pour les clients",
        "Suivi de l'adhésion au programme"
      ]
    },
    {
      title: "Suivi des progrès",
      description: "Visualisez les progrès de vos élèves avec des graphiques et des statistiques détaillés.",
      icon: "📊",
      details: "Notre système de suivi des progrès offre une vue complète de l'évolution de vos clients. Vous pouvez suivre des métriques clés telles que le poids, les mensurations, les performances aux exercices, et même des indicateurs personnalisés. Les données sont présentées sous forme de graphiques interactifs, permettant une analyse approfondie et facilitant l'ajustement des programmes d'entraînement.",
      features: [
        "Graphiques d'évolution personnalisables",
        "Comparaison des performances dans le temps",
        "Alertes de plateau ou de régression",
        "Rapports de progrès automatisés",
        "Intégration avec des appareils de fitness connectés"
      ]
    },
    {
      title: "Communication en temps réel",
      description: "Restez en contact avec vos élèves grâce à notre système de messagerie intégré.",
      icon: "💬",
      details: "Notre plateforme de communication en temps réel facilite les échanges entre coachs et clients. Vous pouvez envoyer des messages instantanés, partager des fichiers, et même organiser des appels vidéo directement depuis l'application. Cette fonctionnalité permet un suivi plus proche et personnalisé, renforçant la relation coach-client et améliorant l'engagement.",
      features: [
        "Messagerie instantanée",
        "Partage de fichiers (images, vidéos, documents)",
        "Appels vidéo intégrés",
        "Création de groupes de discussion",
        "Notifications push pour une réactivité optimale"
      ]
    },
    {
      title: "Bibliothèque d'exercices",
      description: "Accédez à une vaste bibliothèque d'exercices avec des vidéos et des instructions détaillées.",
      icon: "🏋️‍♀️",
      details: "Notre bibliothèque d'exercices complète contient des milliers de mouvements couvrant toutes les disciplines du fitness. Chaque exercice est accompagné d'une vidéo démonstrative, d'instructions détaillées sur la forme correcte, et d'informations sur les muscles ciblés. Vous pouvez facilement intégrer ces exercices dans vos programmes d'entraînement ou les partager individuellement avec vos clients.",
      features: [
        "Plus de 5000 exercices catégorisés",
        "Vidéos HD de démonstration",
        "Instructions écrites détaillées",
        "Informations sur les muscles ciblés et les variantes",
        "Possibilité d'ajouter vos propres exercices personnalisés"
      ]
    },
    {
      title: "Gestion des paiements",
      description: "Gérez facilement les paiements et les abonnements de vos élèves.",
      icon: "💳",
      details: "Notre système de gestion des paiements simplifie la facturation et le suivi des revenus. Vous pouvez créer différents forfaits d'abonnement, gérer les paiements récurrents, et même proposer des options de paiement à la séance. Les clients peuvent effectuer des paiements sécurisés directement via l'application, et vous recevez des notifications instantanées pour chaque transaction.",
      features: [
        "Intégration avec les principaux systèmes de paiement",
        "Gestion des abonnements récurrents",
        "Facturation automatisée",
        "Rapports financiers détaillés",
        "Options de remboursement et de crédit"
      ]
    },
    {
      title: "Analyses et rapports",
      description: "Obtenez des insights précieux sur vos performances et celles de vos élèves.",
      icon: "📈",
      details: "Notre outil d'analyse avancé vous fournit des insights détaillés sur votre activité de coaching et les performances de vos clients. Vous pouvez visualiser des tendances à long terme, identifier les domaines d'amélioration, et prendre des décisions éclairées pour optimiser vos services. Les rapports personnalisables vous permettent de vous concentrer sur les métriques qui comptent le plus pour votre activité.",
      features: [
        "Tableaux de bord personnalisables",
        "Analyse de la rétention des clients",
        "Suivi de la satisfaction client",
        "Prévisions de revenus",
        "Exportation de rapports au format PDF ou Excel"
      ]
    }
  ]

  return (
    <div className="min-h-screen from-gray-50">
         {/*
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 shadow-sm z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-violet-600">FlexSync</h1>
          <div className="space-x-4">
            <Button variant="ghost" onClick={() => scrollToSection(sectionRefs.presentation)}>Présentation</Button>
            <Button variant="ghost" onClick={() => scrollToSection(sectionRefs.fonctionnalites)}>Fonctionnalités</Button>
            <Button variant="ghost" onClick={() => scrollToSection(sectionRefs.temoignages)}>Témoignages</Button>
            <Button variant="ghost" onClick={() => scrollToSection(sectionRefs.tarifs)}>Tarifs</Button>
          </div>
        </div>
      </nav>
*/}
      <main className="container mx-auto px-4 space-y-32">
        <section ref={sectionRefs.presentation} className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-8">
            <h2 className="text-5xl font-bold text-gray-900">Qu&apos;est-ce que FlexSync ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              FlexSync est une plateforme innovante qui connecte les coachs sportifs à leurs élèves, 
              offrant des outils puissants pour la gestion des entraînements, le suivi des progrès 
              et la communication en temps réel.
            </p>
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white">
              Commencer gratuitement
            </Button>
          </div>
        </section>

        <section ref={sectionRefs.fonctionnalites} className="min-h-screen">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Fonctionnalités</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Dialog key={index} open={openModal === feature.title} onOpenChange={(isOpen) => setOpenModal(isOpen ? feature.title : null)}>
                <DialogTrigger asChild>
                  <Card className="transition-all duration-300 hover:shadow-lg cursor-pointer ">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <span className="text-4xl mr-4">{feature.icon}</span>
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-black flex items-center">
                      <span className="text-4xl mr-4">{feature.icon}</span>
                      {feature.title}
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <p className="text-gray-700 mb-4">{feature.details}</p>
                    <h4 className="font-semibold text-lg mb-2">Caractéristiques principales :</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>

        <section ref={sectionRefs.temoignages} className="min-h-screen">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Témoignages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Sophie L.",
                role: "Coach de fitness",
                content: "FlexSync a révolutionné ma façon de gérer mes clients. Je peux maintenant suivre leurs progrès en temps réel et adapter leurs programmes d'entraînement en conséquence.",
                avatar: "/placeholder.svg?height=100&width=100"
              },
              {
                name: "Thomas M.",
                role: "Nutritionniste",
                content: "Grâce à FlexSync, je peux facilement créer et partager des plans nutritionnels personnalisés. La communication avec mes clients n'a jamais été aussi simple !",
                avatar: "/placeholder.svg?height=100&width=100"
              },
              {
                name: "Emma R.",
                role: "Yogini",
                content: "L'interface intuitive de FlexSync me permet de me concentrer sur l'enseignement du yoga plutôt que sur l'administration. Mes élèves adorent l'application !",
                avatar: "/placeholder.svg?height=100&width=100"
              },
              {
                name: "Alexandre D.",
                role: "Coach de CrossFit",
                content: "FlexSync m'aide à garder mes athlètes motivés et engagés. Les fonctionnalités de suivi des performances sont particulièrement utiles pour les compétitions.",
                avatar: "/placeholder.svg?height=100&width=100"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section ref={sectionRefs.tarifs} className="min-h-screen">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Tarifs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Débutant",
                price: "19,99€",
                period: "par mois",
                features: [
                  "Jusqu'à 10 clients",
                  "Planification d'entraînements",
                  "Messagerie de base",
                  "Suivi des progrès limité"
                ]
              },
              {
                name: "Professionnel",
                price: "49,99€",
                period: "par mois",
                features: [
                  "Jusqu'à 50 clients",
                  "Planification d'entraînements avancée",
                  "Messagerie illimitée",
                  "Suivi des progrès complet",
                  "Analyses et rapports",
                  "Intégration de paiements"
                ]
              },
              {
                name: "Entreprise",
                price: "99,99€",
                period: "par mois",
                features: [
                  "Clients illimités",
                  "Toutes les fonctionnalités Pro",
                  "Support prioritaire",
                  "API personnalisée",
                  "Formations exclusives",
                  "Personnalisation de la marque"
                ]
              }
            ].map((plan, index) => (
              <Card key={index} className="flex flex-col transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold">{plan.price}</span> {plan.period}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">Choisir ce plan</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}