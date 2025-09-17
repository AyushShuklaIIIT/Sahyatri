import { ShieldAlert, Cloudy, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

const AlertCard = ({ alert }) => {
    const { t } = useTranslation();

    const alertStyles = {
        danger: {
            icon: ShieldAlert,
            bg: 'bg-red-100 bg-opacity-80',
            iconBg: 'bg-red-200',
            iconColor: 'text-red-600',
        },
        weather: {
            icon: Cloudy,
            bg: 'bg-blue-100 bg-opacity-80',
            iconBg: 'bg-blue-200',
            iconColor: 'text-blue-600',
        },
        info: {
            icon: Info,
            bg: 'bg-gray-100 bg-opacity-80',
            iconBg: 'bg-gray-200',
            iconColor: 'text-gray-600',
        }
    };

    const style = alertStyles[alert.type] || alertStyles.info;
    const Icon = style.icon;

    return (
        <div className={`p-4 rounded-2xl flex items-start space-x-4 shadow-md ${style.bg}`}>
            <div className={`p-3 rounded-full ${style.iconBg}`}>
                <Icon className={`w-6 h-6 ${style.iconColor}`} />
            </div>
            <div className="flex-1">
                <p className="font-bold text-gray-800">{t(alert.title)}</p>
                <p className="text-sm text-gray-600 mt-1">{t(alert.message)}</p>
                <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
            </div>
        </div>
    );
};

const AlertsScreen = () => {
    const { t } = useTranslation();

    const mockAlerts = [
        {
            id: 1,
            type: 'danger',
            title: 'alerts.danger_title',
            message: 'alerts.danger_message',
            time: '5 minutes ago'
        },
        {
            id: 2,
            type: 'weather',
            title: 'alerts.weather_title',
            message: 'alerts.weather_message',
            time: '1 hour ago'
        },
        {
            id: 3,
            type: 'info',
            title: 'alerts.info_title',
            message: 'alerts.info_message',
            time: '3 hours ago'
        }
    ];

    return (
        <div
            className="p-4 min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/bg.png')" }} // <-- place bg.png inside public/
        >
            <h1 className="text-3xl font-bold text-gray-800 mb-6  bg-opacity-70 p-2 rounded-xl inline-block">
                {t('alerts.title')}
            </h1>
            <div className="space-y-4">
                {mockAlerts.map(alert => (
                    <AlertCard key={alert.id} alert={alert} />
                ))}
            </div>
        </div>
    );
};

export default AlertsScreen;
