import { UserCog, ShieldCheck, Bell, LifeBuoy, LogOut, ChevronRight } from "lucide-react";

const ProfileScreen = ({ user, onLogout }) => {
    const menuItems = [
        { icon: UserCog, label: "Edit Profile" },
        { icon: ShieldCheck, label: "Emergency Contacts" },
        { icon: Bell, label: "Notification Settings" },
        { icon: LifeBuoy, label: "Help & Support" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header Section */}
            <header className="bg-white p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center ring-4 ring-gray-300">
                        <span className="text-3xl font-bold text-gray-600">{user.initials}</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                        <p className="text-gray-500 text-sm">ID: {user.id}</p>
                    </div>
                </div>
            </header>

            <div className="flex-grow p-4">
                <div className="bg-white rounded-2xl p-2 card-shadow">
                    <ul className="divide-y divide-gray-100">
                        {menuItems.map((item) => (
                            <li 
                                key={item.label} 
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

                {/* Logout Button Section */}
                <div className="mt-6">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center space-x-3 bg-white p-4 rounded-2xl card-shadow text-red-500 font-bold hover:bg-red-50 active:scale-95 transition-all"
                    >
                        <LogOut className="w-6 h-6" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;