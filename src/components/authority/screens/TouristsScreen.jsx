import { Search } from 'lucide-react';

const mockTourists = [
    { name: 'Priya Singh', id: 'TIN2025101', status: 'Safe', location: 'Upper Lake' },
    { name: 'Rohan Sharma', id: 'TIN2025102', status: 'Alert', location: 'Van Vihar' },
    { name: 'Anjali Verma', id: 'TIN2025103', status: 'Safe', location: 'Sanchi Stupa' },
    { name: 'Vikram Rathore', id: 'TIN2025104', status: 'Unresponsive', location: 'Bhimbetka Caves' },
];

const StatusBadge = ({ status }) => {
    const styles = {
        Safe: 'bg-green-100 text-green-700',
        Alert: 'bg-red-100 text-red-700',
        Unresponsive: 'bg-yellow-100 text-yellow-700',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>{status}</span>
}

const TouristsScreen = () => {
    return (
        <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Manage Tourists</h3>
                <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Search by name or ID..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
                </div>
            </div>
            <table className="w-full text-left">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-4 font-medium text-sm text-gray-600">Name</th>
                        <th className="p-4 font-medium text-sm text-gray-600">Status</th>
                        <th className="p-4 font-medium text-sm text-gray-600 hidden md:table-cell">Location</th>
                        <th className="p-4 font-medium text-sm text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mockTourists.map(tourist => (
                        <tr key={tourist.id} className="border-b border-gray-200">
                            <td className="p-4">
                                <p className="font-medium text-gray-900">{tourist.name}</p>
                                <p className="text-sm text-gray-500">{tourist.id}</p>
                            </td>
                            <td className="p-4"><StatusBadge status={tourist.status} /></td>
                            <td className="p-4 text-gray-700 hidden md:table-cell">{tourist.location}</td>
                            <td className="p-4"><button className="text-blue-600 font-semibold text-sm">View</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TouristsScreen;