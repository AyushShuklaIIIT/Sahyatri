import { motion } from 'framer-motion';
import { Siren } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PanicModal = ({ onClose }) => {
  const { t } = useTranslation();

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
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t('emergency.title')}</h3>
        <p className="text-gray-600 mb-6">{t('emergency.message')}</p>
        <div className="space-y-3">
          <a href="tel:112" className="block w-full danger-gradient text-white py-3 rounded-xl font-semibold">{t('emergency.call', 'Call Emergency: 112')}</a>
          <button onClick={onClose} className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold">{t('emergency.cancel')}</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PanicModal;