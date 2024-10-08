'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Sidebar = ({ sections }) => {
  const router = useRouter();
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      // Déconnexion
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('user');
      router.push('/login'); // Rediriger vers la page de connexion après déconnexion
      
      // Recharger la page après la redirection
      setTimeout(() => {
        window.location.reload();
      }, 100); // Petit délai pour laisser le temps à la redirection
    }
  };

  return (
    <div className="h-full bg-white shadow-md p-4">
      <nav>
        {sections.map((section, index) => (
          <div key={index} className="mb-4">
            <p className="text-black font-bold pl-2">{section.title}</p>
            {section.links.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.href}
                className="block py-1 px-4 text-gray-700 hover:bg-violet-100 hover:text-violet-600"
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}

        {/* Bouton de déconnexion */}
        <button
          className="w-full py-2 px-4 mt-80 bg-violet-500 text-white font-bold hover:bg-violet-600 transition duration-200"
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </nav>
    </div>
  );
};

// Exemple d'utilisation du composant Sidebar avec des sections et des liens
const SidebarDashboard = () => {
  const sections = [
    {
      title: 'Sport',
      links: [
        { label: "Programme d'entraînement", href: '/dashboard/training' },
        { label: 'Programme nutrition', href: '/dashboard/feeding' }
      ]
    },
    {
      title: 'Administratif',
      links: [
        { label: 'Statistiques', href: '/dashboard/statistique' },
        { label: 'Tableau de bord', href: '/dashboard/controlPanel' }
      ]
    },
    {
      title: 'Messagerie',
      links: [{ label: 'Chat', href: '/dashboard/controlPanel' }]
    },
    {
      title: 'Aide',
      links: [
        { label: 'Contactez-nous', href: '/dashboard/contact' },
        { label: 'FAQ', href: '/dashboard/faq' }
      ]
    }
  ];

  return <Sidebar sections={sections} />;
};

export default SidebarDashboard;
