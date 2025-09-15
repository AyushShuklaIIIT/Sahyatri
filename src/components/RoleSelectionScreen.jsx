import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, ChevronRight, Star, LoaderCircle } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './ui/LanguageSwitcher';

const RoleSelectionScreen = () => {
  const { loginWithRedirect } = useAuth0();
  const [loadingRole, setLoadingRole] = useState(null);
  const { t } = useTranslation();

  const handleLogin = (intendedRole) => {
    setLoadingRole(intendedRole);
    sessionStorage.setItem('intendedRole', intendedRole);
    loginWithRedirect();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-40"
    >
      <div className="h-full flex flex-col">
        <div className="gradient-bg text-white p-6 pb-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8 text-blue-600" fill='currentColor' />
          </div>
          <h2 className="text-2xl font-bold mb-2">{t('welcome_title')}</h2>
          <p className="text-blue-100">{t('access_level')}</p>
        </div>

        <div className="flex-1 p-6 -mt-6">
          <div className="space-y-4">
            {/* Tourist Role Card */}
            <motion.div
              whileHover={{ scale: loadingRole ? 1 : 1.02 }}
              whileTap={{ scale: loadingRole ? 1 : 0.98 }}
              onClick={() => !loadingRole && handleLogin('Tourist')}
              className={`bg-white rounded-2xl p-6 card-shadow transition-all ${loadingRole ? 'cursor-wait opacity-70' : 'cursor-pointer hover:shadow-lg'}`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{t('tourist.title')}</h3>
                  <p className="text-gray-600 text-sm mb-2">{t('tourist.description')}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">{t('tags.digital_id')}</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{t('tags.panic_button')}</span>
                  </div>
                </div>
                {loadingRole === 'Tourist' ? (
                  <LoaderCircle className='w-6 h-6 text-gray-400 animate-spin' />
                ) : (
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </motion.div>

            {/* Authority Role Card */}
            <motion.div
              whileHover={{ scale: loadingRole ? 1 : 1.02 }}
              whileTap={{ scale: loadingRole ? 1 : 0.98 }}
              onClick={() => !loadingRole && handleLogin('Authority')}
              className={`bg-white rounded-2xl p-6 card-shadow transition-all ${loadingRole ? 'cursor-wait opacity-70' : 'cursor-pointer hover:shadow-lg'}`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{t('authority.title')}</h3>
                  <p className="text-gray-600 text-sm mb-2">{t('authority.description')}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">{t('tags.e-fir')}</span>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{t('tags.monitoring')}</span>
                  </div>
                </div>
                {loadingRole === 'Authority' ? (
                  <LoaderCircle className='w-6 h-6 text-gray-400 animate-spin' />
                ) : (
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </motion.div>
          </div>

          <div className='mt-8'>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RoleSelectionScreen;