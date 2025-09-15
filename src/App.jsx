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
          console.log('User synced successfully!');
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

  const renderContent = () => {
    if (isLoading) {
      return <SplashScreen key="splash" />;
    }

    if (permissionError) {
      return <PermissionDeniedScreen key="permission-denied" />;
    }

    if (isAuthenticated) {
      const namespace = 'https://sahyatri-ten.vercel.app';
      const actualRoles = user?.[`${namespace}/roles`] || [];
      const isAuthority = actualRoles.includes('Authority');

      // If intendedRole is Tourist, always show TouristDashboard
      if (intendedRole === 'Tourist') {
        return <TouristDashboard user={user} key="tourist-dashboard" />;
      }
      // If intendedRole is Authority and user has Authority role
      if (intendedRole === 'Authority' && isAuthority) {
        return <AuthorityDashboard user={user} key="authority-dashboard" />;
      }
      // If no intendedRole, fallback to actual role
      if (isAuthority) {
        return <AuthorityDashboard user={user} key="authority-dashboard" />;
      } else {
        return <TouristDashboard user={user} key="tourist-dashboard" />;
      }
    }

    return <RoleSelectionScreen key="role-selection" />;
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <AnimatePresence mode='wait'>
        {renderContent()}
      </AnimatePresence>
    </div>
  );
};

export default App;