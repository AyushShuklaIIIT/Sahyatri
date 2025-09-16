import { Users, Siren, ShieldCheck, Timer } from 'lucide-react';
import AdminMap from '../../map/adminmap';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className='bg-white rounded-2xl p-6 card-shadow'>
        <div className='flex items-center justify-between'>
            <div>
                <p className='text-sm font-medium text-gray-600'>{title}</p>
                <p className='text-3xl font-bold text-gray-900'>{value}</p>
                <p className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-blue-600'}`}>{change}</p>
            </div>
            <div className={`w-12 h-12 ${color}-100 rounded-xl flex items-center justify-center`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
            </div>
        </div>
    </div>
);

const DashboardScreen = () => {
    return (
        <div>
            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                <StatCard title="Active Tourists" value="247" change="+12 today" icon={Users} color="blue" />
                <StatCard title="AI Alerts" value="3" change="Requires attention" icon={Siren} color="red" />
                <StatCard title="Safe Zones" value="89%" change="Coverage active" icon={ShieldCheck} color="green" />
                <StatCard title="Response Time" value="2.3m" change="Average" icon={Timer} color="purple" />
            </div>

            {/* Main Map and Alerts */}
            <div className='lg:col-span-2 bg-white rounded-2xl p-6 card-shadow'>
                <div className='flex items-center justify-between mb-6'>
                    <h3 className='text-xl font-bold text-gray-900'>Live Tourist Map</h3>
                    <div className='flex space-x-2'>
                        <button className='px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium'>Safe Zones</button>
                        <button className='px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium'>Alerts</button>
                    </div>
                </div>
                <div className='map-container h-96 rounded-xl relative text-gray-800 flex items-center justify-center z-0'>
                    <AdminMap />
                </div>
            </div>
        </div>
    );
};

export default DashboardScreen;