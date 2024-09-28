import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">À propos de FlexSync</h3>
            <p className="text-sm">
              FlexSync est une plateforme innovante qui connecte les coachs sportifs à leurs élèves, 
              offrant des outils puissants pour la gestion des entraînements, le suivi des progrès 
              et la communication en temps réel.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-violet-600 transition-colors">Accueil</Link></li>
              <li><Link href="/notre-equipe" className="hover:text-violet-600 transition-colors">Notre équipe</Link></li>
              <li><Link href="/qu-est-ce-que-flexsync" className="hover:text-violet-600 transition-colors">Qu&apos;est-ce que FlexSync ?</Link></li>
              <li><Link href="/tarifs" className="hover:text-violet-600 transition-colors">Tarifs</Link></li>
              <li><Link href="/blog" className="hover:text-violet-600 transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-violet-600 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-violet-600 transition-colors">Contactez-nous</Link></li>
              <li><Link href="/politique-de-confidentialite" className="hover:text-violet-600 transition-colors">Politique de confidentialité</Link></li>
              <li><Link href="/conditions-dutilisation" className="hover:text-violet-600 transition-colors">Conditions d&apos;utilisation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
            <p className="text-sm mb-2">Email: contact@flexsync.com</p>
            <p className="text-sm mb-4">Téléphone: +33 1 23 45 67 89</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-violet-600 transition-colors">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-violet-600 transition-colors">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-violet-600 transition-colors">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-violet-600 transition-colors">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} FlexSync. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}