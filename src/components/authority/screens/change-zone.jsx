import { useEffect, useState } from 'react';
import axios from "axios";

export default function ChangeZone() {
  const [points, setPoints] = useState([]);
  const [zones, setZones] = useState([]);
  const [places, setPlaces] = useState([]);

  // fetch zones on mount
    useEffect(() => {
    // define an inner async function
    const fetchZones = async () => {
      try {
        const res = await axios.get(
          `https://sahyatri-backend.vercel.app/fetch_loc`
        );
        const json = await res.data;
        setPoints(json.points || []);
        setZones(json.zones || []);
        setPlaces(json.places || []);
      } catch (err) {
        console.error('Error fetching zones:', err);
      }
    };

    fetchZones(); // call it
  }, []);

  // handle color change
  const handleColorChange =async (index, newColor) => {
    const updated = [...zones];
    updated[index] = { ...updated[index], color: newColor };
    setZones(updated);
    try {
        const res = await axios.post(
          `https://sahyatri-backend.vercel.app/update_loc`,
          { zones: updated, places, points }
        );
      } catch (err) {
        console.error('Error fetching zones:', err);
      }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Zones</h2>
      <ul className="space-y-3">
        {zones.map((zone, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{zone.name}</p>
                <p className="text-sm text-gray-500">Color: {zone.color}</p>
              </div>
              <select
                className="border rounded px-2 py-1"
                value={zone.color}
                onChange={(e) => handleColorChange(index, e.target.value)}
              >
                <option value="yellow">Yellow</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
