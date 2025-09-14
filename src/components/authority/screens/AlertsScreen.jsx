import { ShieldAlert, AlertTriangle, Info } from 'lucide-react';

const AlertCard = ({ level, title, time, children }) => {
    const styles = {
        HIGH: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: ShieldAlert, iconColor: 'text-red-500', dot: 'bg-red-500' },
        MEDIUM: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: AlertTriangle, iconColor: 'text-yellow-500', dot: 'bg-yellow-500' },
        INFO: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: Info, iconColor: 'text-blue-500', dot: 'bg-blue-500' }
    };
    const style = styles[level];

    return (
        <div className={`p-4 ${style.bg} border ${style.border} rounded-xl`}>
            <div className='flex items-start justify-between mb-2'>
                <div className='flex items-center space-x-2'>
                    <div className={`w-2 h-2 ${style.dot} rounded-full`}></div>
                    <span className={`text-sm font-medium ${style.text}`}>{level} PRIORITY</span>
                </div>
                <span className={`text-xs ${style.text} opacity-80`}>{time}</span>
            </div>
            <p className={`text-sm ${style.text} font-semibold mb-3`}>{title}</p>
            <div className='flex space-x-2'>
                {children}
            </div>
        </div>
    );
};

const AlertsScreen = () => {
    return (
        <div className='bg-white rounded-2xl p-6 card-shadow'>
            <h3 className='text-xl font-bold text-gray-900 mb-6'>Critical Alerts Feed</h3>
            <div className='space-y-4'>
                <AlertCard level="HIGH" title="Tourist TIN2024045 in restricted zone" time="2 min ago">
                    <button className='px-3 py-1 bg-red-600 text-white text-xs rounded-lg'>Dispatch Unit</button>
                    <button className='px-3 py-1 bg-red-100 text-red-700 text-xs rounded-lg'>View Details</button>
                </AlertCard>
                <AlertCard level="MEDIUM" title="Anomaly detected: Unusual crowd formation" time="5 min ago">
                    <button className='px-3 py-1 bg-yellow-600 text-white text-xs rounded-lg'>Investigate</button>
                    <button className='px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-lg'>Ignore</button>
                </AlertCard>
                <AlertCard level="INFO" title="Weather alert: Heavy rain expected" time="10 min ago">
                    <button className='px-3 py-1 bg-blue-600 text-white text-xs rounded-lg'>Broadcast</button>
                    <button className='px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg'>Acknowledge</button>
                </AlertCard>
            </div>
        </div>
    );
};

export default AlertsScreen;