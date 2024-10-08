// app/dashboard/controlPanel/page.js
import SidebarDashboard from '@/components/SidebarDashboard';

const ControlPanel = () => {
  return (
    <div className="flex h-screen ">
      <SidebarDashboard />
      <main className="flex-grow p-5">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-600">Ici, vous pouvez voir et gérer vos programmes de nutrition.</p>
      </main>
    </div>
  );
};

export default ControlPanel;