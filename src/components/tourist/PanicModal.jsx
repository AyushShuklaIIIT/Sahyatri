import { motion } from 'framer-motion';
import { Siren } from 'lucide-react';

const PanicModal = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-red-900 bg-opacity-90 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-sm w-full text-center"
      >
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Siren className="w-10 h-10 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Emergency Alert Activated!</h3>
        <p className="text-gray-600 mb-6">Authorities and emergency contacts have been notified.</p>
        <div className="space-y-3">
          <button className="w-full danger-gradient text-white py-3 rounded-xl font-semibold">Call Emergency: 112</button>
          <button onClick={onClose} className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold">Cancel Alert</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PanicModal;