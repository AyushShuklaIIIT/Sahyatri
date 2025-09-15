import { BellRing } from "lucide-react";
import { useTranslation } from "react-i18next";

const AlertsScreen = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 text-center">
            <BellRing className="w-16 h-16 text-yellow-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">{t('alerts.title')}</h1>
            <p className="text-gray-600 mt-2">{t('alerts.message')}</p>
        </div>
    );
};

export default AlertsScreen;