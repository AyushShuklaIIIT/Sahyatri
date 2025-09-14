import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, LoaderCircle } from 'lucide-react';

// function to generate initials from a full name
const getInitials = (fullName) => {
    if (!fullName) return '';
    const words = fullName.trim().split(' ');
    // If only one name, take the first two letters.
    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
    }
    // Otherwise, take the first letter of the first and last names.
    return (words[0][0] + (words[words.length - 1][0] || '')).toUpperCase();
};


const TouristLoginScreen = ({ setScreen, onLogin }) => {
    const [name, setName] = useState('');
    const [touristId, setTouristId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (!name || !touristId || !password) {
            setError('Please fill in all fields.');
            return;
        }

        setError('');
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            const userInitials = getInitials(name);
            onLogin('tourist', { name: name, id: touristId, initials: userInitials });
        }, 1500);
    };

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-white z-40"
        >
            <div className="h-full flex flex-col">
                <div className="safety-gradient text-white p-6 pb-8">
                    <button onClick={() => setScreen('role')} className="mb-6">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold">Tourist Login</h2>
                    <p className="text-green-100">Secure Access with Digital ID</p>
                </div>
                
                <div className="flex-1 p-6 -mt-4 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 card-shadow mb-4">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                                <Lock className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Digital ID Login</h3>
                                <p className="text-sm text-gray-600">Blockchain-secured identity</p>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                                <input 
                                    type="text" 
                                    id='name'
                                    placeholder="e.g., John Doe" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                />
                            </div>
                            <div>
                                <label htmlFor="tourist-id" className='block text-sm font-medium text-gray-700 mb-2'>Tourist ID</label>
                                <input 
                                    type="text" 
                                    id='tourist-id'
                                    placeholder="e.g., BPL202509141040" 
                                    value={touristId}
                                    onChange={(e) => setTouristId(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                                <input 
                                    type="password" 
                                    id='password'
                                    placeholder="••••••••" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                />
                            </div>

                            {error && <p className="text-sm text-red-600">{error}</p>}
                            
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full safety-gradient text-white py-3 rounded-xl font-semibold flex items-center justify-center transition-opacity disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <>
                                        <LoaderCircle className="animate-spin mr-2" />
                                        Logging in...
                                    </>
                                ) : (
                                    'Login with Digital ID'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default TouristLoginScreen;