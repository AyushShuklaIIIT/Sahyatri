import { UserCog, BellRing, Palette } from 'lucide-react';

const SettingsScreen = ({ user }) => {
    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl card-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><UserCog className="mr-2"/> Profile Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Username</label>
                        <input type="text" value={user.name} className="w-full mt-1 p-2 border rounded-lg bg-gray-100" disabled/>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Department</label>
                        <input type="text" value={user.department} className="w-full mt-1 p-2 border rounded-lg bg-gray-100" disabled/>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl card-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><BellRing className="mr-2"/> Notification Preferences</h3>
                <div className="flex items-center justify-between">
                    <p>Enable Email Notifications</p>
                    <button className="w-12 h-6 bg-gray-200 rounded-full p-1 flex items-center"><span className="w-4 h-4 bg-white rounded-full"></span></button>
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;