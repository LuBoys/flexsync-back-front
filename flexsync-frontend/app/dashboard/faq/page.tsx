// app/dashboard/faq/page.js

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import SidebarDashboard from '@/components/SidebarDashboard';
  
  const faqItems = [
    {
      question: "Qu'est-ce que FlexSync ?",
      answer: "FlexSync est une plateforme innovante qui connecte les coachs sportifs et leurs clients. Elle permet une gestion efficace des programmes d'entraînement, un suivi des progrès en temps réel, et une communication facilitée entre coach et sportif."
    },
    {
      question: "Comment puis-je m'inscrire sur FlexSync ?",
      answer: "L'inscription sur FlexSync est simple. Cliquez sur le bouton 'S'inscrire' en haut à droite de la page d'accueil. Choisissez votre profil (coach ou sportif), remplissez le formulaire avec vos informations personnelles, et validez votre inscription. Vous recevrez ensuite un email de confirmation pour activer votre compte."
    },
    {
      question: "Quels sont les avantages pour les coachs ?",
      answer: "FlexSync offre aux coachs une suite d'outils pour gérer efficacement leur clientèle : création de programmes personnalisés, suivi des progrès des clients, planification des séances, messagerie intégrée, et analyses détaillées des performances. Cela permet aux coachs de se concentrer sur l'essentiel : l'accompagnement de leurs clients."
    },
    {
      question: "Quels sont les avantages pour les sportifs ?",
      answer: "Les sportifs bénéficient d'un suivi personnalisé, d'un accès facile à leurs programmes d'entraînement, d'outils de suivi de leurs progrès, et d'une communication directe avec leur coach. FlexSync rend l'expérience d'entraînement plus engageante et motivante."
    },
    {
      question: "FlexSync est-il compatible avec les appareils mobiles ?",
      answer: "Oui, FlexSync est entièrement responsive. Vous pouvez accéder à toutes les fonctionnalités depuis votre smartphone ou tablette, ce qui vous permet de suivre vos entraînements ou de gérer vos clients où que vous soyez."
    },
    {
      question: "Comment fonctionne la tarification de FlexSync ?",
      answer: "FlexSync propose différentes formules d'abonnement pour répondre aux besoins variés des coachs et des sportifs. Nous offrons un essai gratuit de 30 jours. Pour plus de détails sur nos tarifs, veuillez consulter notre page de tarification."
    },
    {
      question: "Mes données sont-elles sécurisées sur FlexSync ?",
      answer: "La sécurité et la confidentialité de vos données sont notre priorité. FlexSync utilise des protocoles de cryptage avancés pour protéger toutes les informations stockées sur notre plateforme. Nous sommes également conformes aux réglementations RGPD."
    },
    {
      question: "Comment puis-je contacter le support client ?",
      answer: "Notre équipe de support est disponible 7j/7. Vous pouvez nous contacter via le formulaire de contact sur notre site, par email à support@flexsync.com, ou par téléphone au 01 23 45 67 89 pendant les heures ouvrables."
    }
  ]
  
  export default function Faq() {
    return (
    <div className="flex h-screen">
      <SidebarDashboard />
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Foire Aux Questions</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Questions fréquemment posées</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
    )
  }