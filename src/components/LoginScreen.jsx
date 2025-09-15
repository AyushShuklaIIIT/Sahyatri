import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import { LogIn, Star, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

const LoginScreen = () => {
    const { loginWithRedirect } = useAuth0();
    const [ isRedirecting, setIsRedirecting ] = useState(false);

    const handleLogin = () => {
        setIsRedirecting(true);
        loginWithRedirect();
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='fixed inset-0 gradient-bg flex flex-col items-center justify-center text-white'
        >
            <div className='text-center'>
                <div className='w-32 h-32 mx-auto mb-8 bg-white rounded-full flex items-center justify-center blockchain-pattern'>
                    <Star className='w-16 h-16 text-blue-600' fill='currentColor' />
                </div>
                <h1 className='text-4xl font-bold mb-4'>Welcome to Sahyatri</h1>
                <p className='text-blue-100 text-lg px-8 mb-12'>Your trusted safety companion.</p>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogin}
                    disabled={isRedirecting}
                    className='bg-white text-blue-600 font-bold py-4 px-8 rounded-xl text-lg flex items-center mx-auto shadow-lg transition-opacity disabled:opacity-75'
                >
                { isRedirecting ? (
                    <>
                        <LoaderCircle className='animate-spin mr-3' />
                        Redirecting...
                    </>
                ) : (
                    <>
                        <LogIn className='mr-3' />
                        Login or Sign Up
                    </>
                )}
                </motion.button>
            </div>
        </motion.div>
    )
}

export default LoginScreen;