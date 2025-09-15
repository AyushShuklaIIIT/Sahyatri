import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TouristDashboard from './components/tourist/TouristDashboard';
import AuthorityDashboard from './components/authority/AuthorityDashboard';
import SplashScreen from './components/SplashScreen';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import PermissionDeniedScreen from './components/PermissionDeniedScreen';

const App = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const intendedRole = sessionStorage.getItem('intendedRole');
      sessionStorage.removeItem('intendedRole');

      const namespace = 'https://sahyatri-ten.vercel.app';
      const actualRoles = user?.[`${namespace}/roles`] || [];
      const isAuthority = actualRoles.includes('Authority');

      if (intendedRole === 'Authority' && !isAuthority) {
        setPermissionError(true);
      }
    }
  }, [isAuthenticated, user]);

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