import { ShieldCheck, Bell, LifeBuoy, LogOut, ChevronRight, MessageSquareWarning } from "lucide-react";
import { useAuth0 } from '@auth0/auth0-react';
import LanguageSwitcher from '../../ui/LanguageSwitcher';
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ComplaintModal from "../ui/ComplaintModal";

const getInitials = (name = '') => {
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + (words[words.length - 1][0] || '')).toUpperCase();
};

const ProfileScreen = () => {
    const { user, logout } = useAuth0();
    const { t } = useTranslation();
    const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);

    const menuItems = [
        { id: 'emergency', icon: ShieldCheck, label: t('profile.emergency_contacts') },
        { id: 'notifications', icon: Bell, label: t('profile.settings') },
        { id: 'help', icon: LifeBuoy, label: t('profile.help_support') },
        { id: 'complaint', icon: MessageSquareWarning, label: t('profile.complaint') }
    ];

    const handleMenuItemClick = (id) => {
        if (id === 'complaint') {
            setIsComplaintModalOpen(true);
        }
    };

    if (!user) {
        return <div className="flex items-center justify-center min-h-screen">{t('loading')}</div>;
    }

    const initials = getInitials(user.name);

    return (
        <>
            <div
                className="flex flex-col min-h-screen bg-cover bg-center"
                style={{ backgroundImage: "url('/bg.png')" }} // <-- background image from public folder
            >
                {/* Header Section */}
                <header className="bg-white bg-opacity-80 p-6 shadow-sm">
                    <div className="flex items-center space-x-4">
                        {user.picture ? (
                            <img
                                src={user.picture}
                                alt={`Profile of ${user.name}`}
                                className="w-20 h-20 rounded-full ring-4 ring-gray-300 object-cover"
                            />
                        ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center ring-4 ring-gray-300">
                                <span className="text-3xl font-bold text-gray-600">{initials}</span>
                            </div>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                            <p className="text-gray-500 text-sm">ID: {user.sub}</p>
                        </div>
                    </div>
                </header>

                <div className="flex-grow p-4">
                    <div className="bg-white bg-opacity-80 rounded-2xl p-2 card-shadow">
                        <ul className="divide-y divide-gray-100">
                            {menuItems.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => handleMenuItemClick(item.id)}
                                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <item.icon className="w-6 h-6 text-gray-500" />
                                        <span className="font-medium text-gray-700">{item.label}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6">
                        <LanguageSwitcher />
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                            className="w-full flex items-center justify-center space-x-3 bg-white bg-opacity-80 p-4 rounded-2xl card-shadow text-red-500 font-bold hover:bg-red-50 active:scale-95 transition-all"
                        >
                            <LogOut className="w-6 h-6" />
                            <span>{t('profile.logout')}</span>
                        </button>
                    </div>
                </div>
            </div>

            <ComplaintModal
                isOpen={isComplaintModalOpen}
                onClose={() => setIsComplaintModalOpen(false)}
            />
        </>
    );
};

export default ProfileScreen;
