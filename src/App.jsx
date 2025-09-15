import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TouristDashboard from './components/tourist/TouristDashboard';
import AuthorityDashboard from './components/authority/AuthorityDashboard';
import SplashScreen from './components/SplashScreen';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import PermissionDeniedScreen from './components/PermissionDeniedScreen';

const App = () => {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();
  const [permissionError, setPermissionError] = useState(false);
  const [intendedRole, setIntendedRole] = useState(null);
  const [isUserSynced, setIsUserSynced] = useState(false);

  // PWA install state
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  // Sync user
  useEffect(() => {
    const syncUser = async () => {
      if (isAuthenticated && !isUserSynced) {
        try {
          const accessToken = await getAccessTokenSilently();
          await fetch('http://localhost:8080/api/sync-user', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
          });
          setIsUserSynced(true);
        } catch (e) {
          console.error('Error syncing user:', e);
        }
      }
    };
    syncUser();
  }, [isAuthenticated, getAccessTokenSilently, isUserSynced]);

  // Role & permission
  useEffect(() => {
    if (isAuthenticated) {
      if (!intendedRole) {
        const role = sessionStorage.getItem('intendedRole');
        setIntendedRole(role);
        sessionStorage.removeItem('intendedRole');
      }
      const namespace = 'https://sahyatri-ten.vercel.app';
      const actualRoles = user?.[`${namespace}/roles`] || [];
      const isAuthority = actualRoles.includes('Authority');
      if (intendedRole === 'Authority' && !isAuthority) {
        setPermissionError(true);
      }
    } else {
      setIntendedRole(null);
      setPermissionError(false);
    }
  }, [isAuthenticated, user, intendedRole]);

  // PWA beforeinstallprompt — store for later
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(e);
      setShowInstallBtn(true);
      console.log('beforeinstallprompt fired', e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    console.log('User choice for PWA install:', choiceResult.outcome); // accepted or dismissed

    // Hide install button after user choice
    setShowInstallBtn(false);
    setDeferredPrompt(null);
  };

  const renderContent = () => {
    if (isLoading) return <SplashScreen key="splash" />;
    if (permissionError) return <PermissionDeniedScreen key="permission-denied" />;
    if (isAuthenticated) {
      const namespace = 'https://sahyatri-ten.vercel.app';
      const actualRoles = user?.[`${namespace}/roles`] || [];
      const isAuthority = actualRoles.includes('Authority');

      if (intendedRole === 'Tourist') return <TouristDashboard user={user} key="tourist-dashboard" />;
      if (intendedRole === 'Authority' && isAuthority) return <AuthorityDashboard user={user} key="authority-dashboard" />;
      return isAuthority ? <AuthorityDashboard user={user} key="authority-dashboard" /> : <TouristDashboard user={user} key="tourist-dashboard" />;
    }
    return <RoleSelectionScreen key="role-selection" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 relative flex flex-col">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>

      {/* Install App Button */}
      {showInstallBtn && (
  <div className="relative min-h-screen">
    <div className="absolute bottom-4 right-4 z-[9999]">
      <button
        onClick={handleInstall}
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        Install App
      </button>
    </div>
  </div>
)}


      
    </div>
  );
};

export default App;
