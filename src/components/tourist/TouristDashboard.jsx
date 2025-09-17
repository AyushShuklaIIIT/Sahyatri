import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Siren } from 'lucide-react';
import BottomNav from './ui/BottomNav';
import MapScreen from './screens/MapScreen';
import AlertsScreen from './screens/AlertsScreen';
import ProfileScreen from './screens/ProfileScreen';
import PanicModal from './PanicModal';
import NearbyScreen from './screens/NearbyScreen';
import RedZoneWarning from './ui/RedZoneWarning';
import { useDispatch, useSelector } from 'react-redux';
import { setIsInRedZone, setWarningDisplayed } from '../../store/redZoneSlice';

const RenderActiveScreen = ({ activeTab, user }) => {
    switch (activeTab) {
        case 'map':
            return <MapScreen />;
        case 'nearby':
            return <NearbyScreen />;
        case 'alerts':
            return <AlertsScreen />;
        case 'profile':
            return <ProfileScreen user={user} />;
        default:
            return <MapScreen />;
    }
};

const TouristDashboard = ({ user }) => {
    const [activeTab, setActiveTab] = useState('map');
    const [isPanicModalOpen, setisPanicModalOpen] = useState(false);
    const dispatch = useDispatch();
    const isInRedZone = useSelector((state) => state.redZone.isInRedZone); // Make this state true to trigger the red zone warning screen.
    const isWarningDisplayed = useSelector((state) => state.redZone.isWarningDisplayed);
    const [warningSound, setWarningSound] = useState(null);

    useEffect(() => {
        const audio = new Audio('/warning-alert.mp3');
        audio.preload = 'auto';
        setWarningSound(audio);
    }, []);

    if (!user) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
            </div>
        );
    }

    return (
        <>
            <AnimatePresence>
                {(isInRedZone && !isWarningDisplayed) && <RedZoneWarning onClose={() => {
                    dispatch(setIsInRedZone(false));
                    dispatch(setWarningDisplayed(true))
                }} warningSound={warningSound} />}
            </AnimatePresence>

            <div className="w-full min-h-screen bg-gray-50 relative md:mx-auto">
                <main className="pb-24">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <RenderActiveScreen activeTab={activeTab} user={user} />
                        </motion.div>
                    </AnimatePresence>
                </main>

                <AnimatePresence>
                    {activeTab !== 'map' && (
                        <motion.button
                            initial={{ scale: 0, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0, y: 50 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setisPanicModalOpen(true)}
                            className="fixed bottom-24 right-5 w-20 h-20 danger-gradient text-white rounded-full flex items-center justify-center floating-shadow pulse-ring z-40"
                        >
                            <Siren className="w-10 h-10" />
                        </motion.button>
                    )}
                </AnimatePresence>


                {/* Bottom Navigation */}
                <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* Panic Modal */}
            <AnimatePresence>
                {isPanicModalOpen && <PanicModal onClose={() => setisPanicModalOpen(false)} />}
            </AnimatePresence>
        </>
    );
};

export default TouristDashboard;
