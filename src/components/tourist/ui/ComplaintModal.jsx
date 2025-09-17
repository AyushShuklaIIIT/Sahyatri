import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { X, LoaderCircle, CheckCircle } from 'lucide-react';

const ComplaintModal = ({ isOpen, onClose }) => {
    const [zones, setZones] = useState([]);
    const [selectedZone, setSelectedZone] = useState('');
    const [details, setDetails] = useState('');
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        fetch('https://sahyatri-backend.vercel.app/fetch_loc')
            .then(res => res.json())
            .then(data => {
                setZones(data.zones);
                if (data.zones && data.zones.length > 0) {
                    setSelectedZone(data.zones[0].name);
                }
            })
            .catch(err => console.error("Failed to load zones from backend:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedZone || !details) {
            setError('Please select a zone and provide details.');
            return;
        }
        setStatus('loading');
        setError('');
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch('https://sahyatri-backend.vercel.app/api/complaints', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ zoneName: selectedZone, details }),
            });
            if (!response.ok) throw new Error('Failed to submit complaint.');
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 2000);
        } catch (err) {
            setStatus('error');
            setError(err.message);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-gray-600 bg-opacity-60 z-60 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-2xl p-6 max-w-md w-full"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">File a Complaint</h2>
                            <button onClick={onClose}><X className="w-6 h-6" /></button>
                        </div>
                        {status === 'success' ? (
                            <div className="text-center py-8">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold">Complaint Submitted!</h3>
                                <p className="text-gray-600">Thank you for your feedback.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="zone" className="block text-sm font-medium text-gray-700">Zone</label>
                                    <select
                                        id="zone"
                                        value={selectedZone}
                                        onChange={(e) => setSelectedZone(e.target.value)}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm"
                                    >
                                        {zones.map(zone => <option key={zone.name} value={zone.name}>{zone.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="details" className="block text-sm font-medium text-gray-700">Complaint Details</label>
                                    <textarea
                                        id="details"
                                        rows={4}
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                        placeholder="Please describe the issue..."
                                    ></textarea>
                                </div>
                                {error && <p className="text-sm text-red-600">{error}</p>}
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {status === 'loading' ? <LoaderCircle className="animate-spin" /> : 'Submit Complaint'}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ComplaintModal;