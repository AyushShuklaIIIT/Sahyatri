import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// override the default icon globally
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function AdminMap() {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);
  const [points, setPoints] = useState([]);

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

  // fetch points every second
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await fetch("/data.json");
        const json = await res.json();
        setPoints(json.points || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPoints(); // initial fetch
    const interval = setInterval(fetchPoints, 1000);

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

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
