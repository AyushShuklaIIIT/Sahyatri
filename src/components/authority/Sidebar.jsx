import { LayoutDashboard, Bell, Users, FileText, Settings, LogOut, X } from 'lucide-react';

const Sidebar = ({ user, onLogout, activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'alerts', label: 'AI Alerts', icon: Bell },
    { id: 'tourists', label: 'Tourists', icon: Users },
    { id: 'efir', label: 'E-FIR System', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside className={`fixed top-0 left-0 h-full w-80 border-r border-gray-200 bg-white flex flex-col z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex-shrink-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* User Profile Section & Close Button */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.department}</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-1 -mr-2">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <nav className="p-4 flex-1">
          <div className="space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false); // Close sidebar on navigation
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  activeSection === item.id 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4">
          <button onClick={onLogout} className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;