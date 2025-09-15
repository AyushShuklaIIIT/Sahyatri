import { useAuth0 } from '@auth0/auth0-react';
import { AnimatePresence } from 'framer-motion';
import TouristDashboard from './components/tourist/TouristDashboard';
import AuthorityDashboard from './components/authority/AuthorityDashboard';
import LoginScreen from './components/LoginScreen';
import SplashScreen from './components/SplashScreen';

const App = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <SplashScreen />;
  }

  const renderContent = () => {
    if (!isAuthenticated) {
      return <LoginScreen key="login" />;
    }

    const namespace = 'https://sahyatri-ten.vercel.app';
    const roles = user?.[`${namespace}/roles`] || [];
    const isAuthority = roles.includes('Authority');

    if (isAuthority) {
      return <AuthorityDashboard user={user} key="authority" />;
    } else {
      return <TouristDashboard user={user} key="tourist" />;
    }
  };

  return (
    <div id='app' className='min-h-screen'>
      <AnimatePresence mode='wait'>
        {renderContent()}
      </AnimatePresence>
    </div>
  )
};

export default App;