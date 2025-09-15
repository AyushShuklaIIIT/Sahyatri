import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, ChevronRight, Star, LoaderCircle } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

const RoleSelectionScreen = () => {
  const { loginWithRedirect } = useAuth0();
  const [loadingRole, setLoadingRole] = useState(null);

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
          <h2 className="text-2xl font-bold mb-2">Welcome to Sahyatri</h2>
          <p className="text-blue-100">Choose your access level</p>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Tourist</h3>
                  <p className="text-gray-600 text-sm mb-2">Personal safety & emergency assistance</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">Digital ID</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Panic Button</span>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Authority</h3>
                  <p className="text-gray-600 text-sm mb-2">Police, Tourism Dept & Emergency Response</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">E-FIR</span>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Monitoring</span>
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

          <div className='mt-8 p-4 bg-gray-50 rounded-2xl'>
            <p className='text-sm font-medium text-gray-700 mb-3'>Select Language / भाषा चुनें</p>
            <div className='flex flex-wrap gap-2'>
              <button className='px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium'>English</button>
              <button className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm'>हिंदी</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RoleSelectionScreen;