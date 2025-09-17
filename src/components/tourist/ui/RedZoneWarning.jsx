import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';

const RedZoneWarning = ({ onClose, warningSound }) => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if(countdown === 0) return;

        const timer = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    useEffect(() => {
        if(warningSound) {
            warningSound.volume = 1.0;
            warningSound.play().catch(error => console.error('Audio playback failed:', error));
        }

        else {
            const sound = new Audio('/warning-alert.mp3');
            sound.volume = 1.0;
            sound.play().catch(error => console.error('Audio playback failed:', error));
        }

        if('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200]);
        }
    }, [warningSound]);

    return (
        <motion.div
            key="red-zone-warning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-red-800/75 z-[9999] flex flex-col items-center justify-center text-white text-center p-4 backdrop-blur-sm'
        >
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <ShieldAlert className='w-24 h-24 text-white' />
            </motion.div>
            <h1 className='text-4xl font-bold mt-6 tracking-wider'>DANGER</h1>
            <p className='text-lg mt-2 max-w-md'>
                You have entered a restricted high-risk zone. For your safety, please leave the area immediately.
            </p>

            <div className='mt-8'>
                {countdown > 0 ? (
                    <p className='bg-white/20 text-white font-semibold rounded-lg px-4 py-2'>
                        You can close this warning in {countdown}s
                    </p>
                ) : (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className='flex items-center space-x-2 bg-white text-red-600 font-bold px-6 py-3 rounded-lg shadow-lg'
                    >
                        <X className='w-6 h-6' />
                        <span>Close Warning</span>
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
};

export default RedZoneWarning;