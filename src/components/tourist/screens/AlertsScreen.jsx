import { BellRing } from "lucide-react";

const AlertsScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 text-center">
            <BellRing className="w-16 h-16 text-yellow-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Notifications & Alerts</h1>
            <p className="text-gray-600 mt-2">A list of all recent safety alerts, weather updates, and system notifications would appear here.</p>
        </div>
    );
};

export default AlertsScreen;