import { motion } from 'framer-motion';
import { Map, Bell, User, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NavItem = ({ icon: Icon, label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-full h-full pt-2 pb-1 transition-colors duration-200 ${
                isActive ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'
            }`}
        >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
        </button>
    );
};

const BottomNav = ({ activeTab, onTabChange }) => {
    const { t } = useTranslation();
    const navItems = [
        { id: 'map', label: t('nav.map'), icon: Map },
        { id: 'nearby', label: t('nav.nearby'), icon: MapPin },
        { id: 'alerts', label: t('nav.alerts'), icon: Bell },
        { id: 'profile', label: t('nav.profile'), icon: User },
    ];

    return (
        <footer className="fixed bottom-0 left-0 w-full z-50 md:left-1/2 md:transform md:-translate-x-1/2">
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="flex justify-around bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-t-md"
            >
                {navItems.map((item) => (
                    <NavItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        isActive={activeTab === item.id}
                        onClick={() => onTabChange(item.id)}
                    />
                ))}
            </motion.div>
        </footer>
    );
};

export default BottomNav;