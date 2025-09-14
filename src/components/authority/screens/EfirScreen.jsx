import { FilePlus, Clock } from 'lucide-react';

const EfirScreen = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl card-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><FilePlus className="mr-2"/> Initiate E-FIR</h3>
                <form className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Tourist ID</label>
                        <input type="text" placeholder="TIN..." className="w-full mt-1 p-2 border rounded-lg"/>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Last Known Location</label>
                        <input type="text" placeholder="e.g., Van Vihar" className="w-full mt-1 p-2 border rounded-lg"/>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold">Generate Case File</button>
                </form>
            </div>
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl card-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><Clock className="mr-2"/> Recent Cases</h3>
                <p className="text-gray-600">A table of recent E-FIR cases would be displayed here.</p>
            </div>
        </div>
    );
};

export default EfirScreen;