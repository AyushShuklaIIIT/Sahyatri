import { motion } from 'framer-motion';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';

const AuthorityLoginScreen = ({ setScreen, onLogin }) => {
  const handleLogin = () => {
    // In a real app, you would validate the form data
    onLogin('authority', { name: 'Officer Kumar', department: 'Delhi Police' });
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ ease: 'easeInOut' }}
      className="fixed inset-0 bg-white z-40"
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="authority-gradient text-white p-6 pb-8">
          <button onClick={() => setScreen('role')} className="mb-6">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Authority Login</h2>
          <p className="text-blue-100">Secure access for authorized personnel</p>
        </div>

        {/* Login Form */}
        <div className="flex-1 p-6 -mt-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Secure Login</h3>
                <p className="text-sm text-gray-600">Multi-factor authentication required</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor='department' className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" id='department'>
                  <option>Bhopal Police</option>
                  <option>Tourism Department</option>
                  <option>Emergency Response</option>
                </select>
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input type="text" placeholder="officer.kumar" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" id='username' />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" id='password' />
              </div>
              <div>
                <label htmlFor="2fa-code" className="block text-sm font-medium text-gray-700 mb-2">2FA Code</label>
                <input type="text" placeholder="123456" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" id='2fa-code' />
              </div>
              <button onClick={handleLogin} className="w-full authority-gradient text-white py-3 rounded-xl font-semibold">
                Secure Login
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Security Notice</p>
                <p className="text-xs text-yellow-700 mt-1">All access is logged and monitored. Unauthorized access is prohibited.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthorityLoginScreen;