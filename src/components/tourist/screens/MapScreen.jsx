// import { MapPin } from "lucide-react";
import LiveMap from "../../map/livemap";

const MapScreen = () => {
    return (
        <div className="flex flex-col items-center h-[calc(100vh-64px)] justify-center bg-gray-100 p-4 text-center">
            {/* <MapPin className="w-16 h-16 text-blue-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Live Safety Map</h1>
            <p className="text-gray-600 mt-2">The interactive map would be rendered here, showing your location, safe zones, and high-risk areas.</p> */}
            <LiveMap />
        </div>
    );
};

export default MapScreen;