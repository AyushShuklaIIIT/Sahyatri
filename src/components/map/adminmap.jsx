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

export default function PointsMap() {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const [points, setPoints] = useState([]);

  // fetch JSON points
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setPoints(json.points))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    // init map with some default center
    const map = L.map(mapRef.current).setView([23.217319, 77.408748], 13);
    leafletMapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // watch user location and center map there (no marker shown)
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        map.setView([lat, lng], map.getZoom());
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      map.remove();
      leafletMapRef.current = null;
    };
  }, []);

  // add markers when points change
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map || !points.length) return;

    points.forEach((p) => {
      L.marker(p.position).addTo(map).bindPopup(p.popup);
    });
  }, [points]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
