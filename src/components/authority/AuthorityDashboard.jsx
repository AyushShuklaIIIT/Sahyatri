// src/components/authority/AuthorityDashboard.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const AuthorityDashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="desktop-layout flex min-h-screen bg-gray-50"
    >
      <Sidebar 
        user={user} 
        onLogout={onLogout} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 p-4 md:p-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Command Dashboard</h1>
            <p className="text-gray-600 hidden md:block">Real-time tourist safety monitoring</p>
          </div>
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="md:hidden p-2 -mr-2"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </header>

        <main className="p-4 md:p-6 flex-1">
          {/* Content will change based on activeSection */}
          <h2 className="text-xl font-semibold">Welcome, {user.name}</h2>
          <p>This is the main content area for the {activeSection} section.</p>
          {/* Add StatsGrid, LiveTouristMap, AlertsPanel etc. here */}
        </main>
      </div>
    </motion.div>
  );
};

export default AuthorityDashboard;