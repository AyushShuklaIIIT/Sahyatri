import { useEffect, useState } from 'react';

export default function ChangeZone() {
  const [zones, setZones] = useState([]);

  // fetch zones on mount
  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setZones(data.zones || []);
      });
  }, []);

  // handle color change
  const handleColorChange = (index, newColor) => {
    const updated = [...zones];
    updated[index] = { ...updated[index], color: newColor };
    setZones(updated);
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
