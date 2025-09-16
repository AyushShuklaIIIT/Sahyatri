import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import DashboardScreen from './screens/DashboardScreen';
import AlertsScreen from './screens/AlertsScreen';
import TouristsScreen from './screens/TouristsScreen';
import EfirScreen from './screens/EfirScreen';
import SettingsScreen from './screens/SettingsScreen';
import ZoneControlScreen from './screens/ZoneControlScreen';
import { useAuth0 } from '@auth0/auth0-react';
import ChangeZone from './screens/change-zone';

const RenderActiveScreen = ({ activeSection, user }) => {
    switch (activeSection) {
        case 'alerts':
            return <AlertsScreen />;
        case 'tourists':
            return <TouristsScreen />;
        case 'efir':
            return <EfirScreen />;
        case 'settings':
            return <SettingsScreen user={user} />;
        case 'change zone':
            return <ChangeZone />;
        case 'dashboard':
        default:
            return <DashboardScreen />;
    }
};

const AuthorityDashboard = () => {
    const { user } = useAuth0();
    const [activeSection, setActiveSection] = useState('dashboard');
    const [isSidebarOpen, setisSidebarOpen] = useState(false);
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen bg-gray-50"
        >
            <Sidebar 
                user={user}
                activeSection={activeSection} 
                setActiveSection={setActiveSection}
                isOpen={isSidebarOpen}
                setIsOpen={setisSidebarOpen}
            />
            
            <div className="flex-1 flex flex-col">
                <header className="bg-white border-b border-gray-200 p-4 md:p-6 flex justify-between items-center sticky top-0 z-20">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 capitalize">{activeSection}</h1>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <div className='hidden md:flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-2 rounded-lg'>
                            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                            <span className='text-sm font-medium'>System Online</span>
                        </div>
                        <button 
                            onClick={() => setisSidebarOpen(true)} 
                            className="md:hidden p-2 -mr-2"
                        >
                            <Menu className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </header>

                <main className="p-4 md:p-6 flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <RenderActiveScreen activeSection={activeSection} user={user} />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </motion.div>
    );
};

export default AuthorityDashboard;