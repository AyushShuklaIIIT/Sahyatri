// src/components/SplashScreen.jsx
import { motion } from 'framer-motion';
import { Shield, Star } from 'lucide-react';

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 gradient-bg flex flex-col items-center justify-center text-white z-50"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <div className="w-32 h-32 mx-auto mb-8 bg-white rounded-full flex items-center justify-center blockchain-pattern">
          <Star className="w-16 h-16 text-blue-600" fill="currentColor" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Sahyatri</h1>
        <p className="text-blue-100 text-lg px-8 mb-2">AI, Blockchain & Geo-Fencing</p>
        <p className="text-blue-200 text-sm px-8">Powered Tourist Safety</p>
        
        <div className="mt-12">
          <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;