import { CheckCircle, Star, ShieldAlert } from 'lucide-react';

const ProfileScreen = ({ user }) => {
    return (
        <>
            <header className="safety-gradient text-white p-4 pb-6 rounded-3xl m-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="font-semibold text-lg">{user.name}</p>
                        <p className="text-green-100 text-xs">ID: {user.id}</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-xl">{user.initials}</span>
                    </div>
                </div>
                {/* Safety Score Card */}
                <div className='bg-white bg-opacity-20 rounded-2xl p-4'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-green-500 text-sm'>Safety Score</p>
                            <p className='text-3xl font-bold text-green-600'>92/100</p>
                            <p className='text-green-500 text-xs flex items-center mt-1'>
                                <CheckCircle className='w-3 h-3 mr-1' />
                                Safe Zone Active
                            </p>
                        </div>
                        <div className='relative w-20 h-20'>
                            <svg className='progress-ring w-full h-full' viewBox='0 0 120 120'>
                                <circle cx={60} cy={60} r={54} fill='none' stroke='rgba(0, 219, 134, 0.2)' strokeWidth={8} />
                                <circle cx={60} cy={60} r={54} fill='none' stroke='rgb(0, 219, 134)' strokeWidth={8} strokeDasharray={339} strokeDashoffset={27} className='progress-ring-circle' />
                            </svg>
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <span className='text-green-500 font-bold'>92%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="p-4">
                {/* Digital ID Card */}
                <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-6 text-white'>
                    <div className='flex items-center justify-between mb-4'>
                        <div>
                            <p className='text-blue-100 text-sm'>Digital Identity</p>
                            <p className='text-xl font-bold'>Blockchain Secured</p>
                        </div>
                        <div className='w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center'>
                            <Star className='w-6 h-6 text-purple-600' />
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm opacity-90'>{user.name}</p>
                            <p className='text-xs opacity-75'>Valid until: Oct 2025</p>
                        </div>
                        <div className='text-right'>
                            <p className='text-xs opacity-75'>Verified</p>
                            <div className='flex items-center justify-end'>
                                <div className='w-2 h-2 bg-green-400 rounded-full mr-2'></div>
                                <span className='text-xs'>Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Alerts */}
                <div className='bg-white rounded-2xl p-4 card-shadow'>
                    <h3 className='font-semibold text-gray-900 mb-4'>Recent Alerts</h3>
                    <div className='space-y-3'>
                        <div className='flex items-start space-x-3 p-3 bg-green-50 rounded-xl'>
                            <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                            <div className='flex-1'>
                                <p className='text-sm font-medium text-gray-900'>Entered Safe Zone</p>
                                <p className='text-xs text-gray-500'>Tourist Area • 3 min ago</p>
                            </div>
                        </div>
                        <div className='flex items-start space-x-3 p-3 bg-red-50 rounded-xl'>
                            <ShieldAlert className="w-5 h-5 text-red-500 mt-1" />
                            <div className='flex-1'>
                                <p className='text-sm font-medium text-gray-900'>High-Risk Zone Warning</p>
                                <p className='text-xs text-gray-500'>You are near a restricted area. Proceed with caution • 1 hr ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileScreen;