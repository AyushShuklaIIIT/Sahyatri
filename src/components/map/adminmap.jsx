import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function AdminMap() {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);
  const zoneLayersRef = useRef([]);
  const [points, setPoints] = useState([]);
  const [zones, setZones] = useState([]);

  // initialize map
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    const map = L.map(mapRef.current).setView([23.217319, 77.408748], 13);
    leafletMapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };
  }, []);

  // fetch points & zones every second
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");
        const json = await res.json();
        setPoints(json.points || []);
        setZones(json.zones || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  // update markers whenever points change
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    // remove old markers
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    // add new markers
    points.forEach((p) => {
      const marker = L.marker(p.position).addTo(map).bindPopup(p.popup);
      markersRef.current.push(marker);
    });
  }, [points]);

  // draw zones whenever zones change
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    // clear old zone layers
    zoneLayersRef.current.forEach((layer) => map.removeLayer(layer));
    zoneLayersRef.current = [];

    zones.forEach((zone) => {
      if (Array.isArray(zone.coords[0])) {
        const polygon = L.polygon(zone.coords, {
          color: zone.color || "blue",
          weight: 2,
          fillOpacity: 0.3,
        }).addTo(map).bindPopup(zone.name);
        zoneLayersRef.current.push(polygon);
      } else {
        const circle = L.circle(zone.coords, {
          color: zone.color || "blue",
          weight: 2,
          fillOpacity: 0.3,
          radius: zone.radius || 500,
        }).addTo(map).bindPopup(zone.name);
        zoneLayersRef.current.push(circle);
      }
    });
  }, [zones]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
