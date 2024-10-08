// app/dashboard/statistique/page.js
import SidebarDashboard from '@/components/SidebarDashboard';

const Statistique = () => {
  return (
    <div className="flex h-screen">
      <SidebarDashboard />
      <main className="flex-grow p-5">
        <h1 className="text-2xl font-bold text-gray-800">Programme d'entraînement</h1>
        <p className="text-gray-600">Ici, vous pouvez voir et gérer vos programmes d'entraînement.</p>
      </main>
    </div>
  );
};

export default Statistique;
