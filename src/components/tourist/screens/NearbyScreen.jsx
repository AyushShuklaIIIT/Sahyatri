import { MapPin, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PlaceCard = ({ name, distance }) => (
    <div className='bg-white p-4 rounded-2xl shadow-sm flex items-center space-x-4'>
        <div className='bg-gray-100 p-3 rounded-xl'>
            <MapPin className='w-6 h-6 text-gray-500' />
        </div>
        <div>
            <p className='font-semibold text-gray-800'>{name}</p>
            <p className='text-sm text-gray-500'>{distance}</p>
        </div>
    </div>
);

const NearbyScreen = () => {
    const { t } = useTranslation();

    const mockPlaces = [
        { id: 1, name: 'Regional Science Center', distance: '4.8 km away'},
        { id: 2, name: 'Taj Mahal Palace', distance: '5 km away'},
        { id: 3, name: 'Sair Sapata', distance: '4.1 km away'},
        { id: 4, name: 'Birla Museum', distance: '3.5 km away'},
        { id: 5, name: 'Madhya Pradesh Tribal Museum', distance: "3.6 km away"}
    ];

    return (
        <div className='p-4 bg-gray-50 min-h-screen'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>{t('nav.nearby')}</h1>
            <div className='relative mb-6'>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input type="text" placeholder='Search for places...' className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl' />
            </div>

            <div className='space-y-4'>
                {mockPlaces.map(place => (
                    <PlaceCard key={place.id} name={place.name} distance={place.distance} />
                ))}
            </div>
        </div> 
    )
}

export default NearbyScreen;