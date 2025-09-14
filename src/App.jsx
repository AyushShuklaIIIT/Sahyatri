import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import TouristLoginScreen from './components/TouristLoginScreen';
import AuthorityLoginScreen from './components/AuthorityLoginScreen';
import TouristDashboard from './components/tourist/TouristDashboard';
import AuthorityDashboard from './components/authority/AuthorityDashboard';

const App = () => {
  const [screen, setScreen] = useState('splash');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('role');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (role, userData) => {
    setUser(userData);
    setScreen(role === 'tourist' ? 'touristDashboard' : 'authorityDashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setScreen('role');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen key="splash" />;
      case 'role':
        return <RoleSelectionScreen key="role" setScreen={setScreen} />;
      case 'touristLogin':
        return <TouristLoginScreen key="touristLogin" setScreen={setScreen} onLogin={handleLogin} />;
      case 'authorityLogin':
        return <AuthorityLoginScreen key="authorityLogin" setScreen={setScreen} onLogin={handleLogin} />;
      case 'touristDashboard':
        return <TouristDashboard key="touristDashboard" user={user} onLogout={handleLogout} />;
      case 'authorityDashboard':
        return <AuthorityDashboard key="authorityDashboard" user={user} onLogout={handleLogout} />;
      default:
        return <RoleSelectionScreen key="default" setScreen={setScreen} />;
    }
  };

  return (
    <div id="app" className='min-h-screen'>
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>
    </div>
  );
};

export default App;