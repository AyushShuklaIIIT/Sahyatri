import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, X } from 'lucide-react';
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
  const [minTimePassed, setMinTimePassed] = useState(false);

  // PWA install state

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      if (isAuthenticated && !isUserSynced) {
        try {
          const accessToken = await getAccessTokenSilently();
          await fetch('https://sahyatri-backend.vercel.app/api/sync-user', {
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

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); 
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

    console.log('User choice for PWA install:', choiceResult.outcome);


    console.log('User choice for PWA install:', choiceResult.outcome); 

    setShowInstallBtn(false);
    setDeferredPrompt(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    if(!minTimePassed || isLoading) {
      return <SplashScreen key="splash" />;
    }

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

      <AnimatePresence>
        {showInstallBtn && (
          <motion.div
            key="install-banner"
            className='fixed bottom-4 left-4 w-auto max-w-sm z-50'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div className='bg-slate-800 text-white p-4 rounded-xl shadow-lg flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <Download className='w-6 h-6 text-blue-400' />
                <div>
                  <p className='font-semibold text-sm'>Install Sahyatri App</p>
                  <p className='text-slate-300 text-xs'>Get a better experience</p>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <button onClick={() => setShowInstallBtn(false)} className='p-2 text-slate-400 hover:text-white'>
                  <X className='w-5 h-5' />
                </button>
                <button onClick={handleInstall} className='px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition'>
                  Install
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
