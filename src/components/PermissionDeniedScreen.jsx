import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import { ShieldAlert, LogOut } from 'lucide-react';

const PermissionDeniedScreen = () => {
    const { logout } = useAuth0();

    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='fixed inset-0 bg-gray-100 flex flex-col items-center justify-center text-center p-4'
        >
            <ShieldAlert className='w-20 h-20 text-red-500 mb-6' />
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>Access Denied</h1>
            <p className='text-gray-600 max-w-md mb-8'>
                Your account does not have the required "Authority" permissions to access this dashboard. Please log in as a Tourist or contact an administrator.
            </p>
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})}
                className='bg-red-600 text-white font-bold py-3 px-6 rounded-lg flex items-center shadow-lg'
            >
                <LogOut className='mr-2' />
                Logout and Try Again
            </motion.button>
        </motion.div>
    )
}

export default PermissionDeniedScreen;