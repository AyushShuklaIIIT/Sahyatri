import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// 👇 override the default icon globally
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function LiveMap({ mode = "both" }) {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const [data, setData] = useState(null);


  useEffect(() => {
    // Fetch JSON data
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!data || !mapRef.current || leafletMapRef.current) return;

    const map = L.map(mapRef.current).setView([23.217319, 77.408748], 13);
    leafletMapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    const zoneLayers = [];

    // DRAW ZONES
    if (mode === "zones" || mode === "both") {
      data.zones.forEach((zone) => {
        if (Array.isArray(zone.coords[0])) {
          const poly = L.polygon(zone.coords, {
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: 0.4,
          }).addTo(map).bindPopup(zone.name);
          zoneLayers.push({ type: "polygon", layer: poly, data: zone });
        } else {
          const circ = L.circle(zone.coords, {
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: 0.4,
            radius: zone.radius,
          }).addTo(map).bindPopup(zone.name);
          zoneLayers.push({ type: "circle", layer: circ, data: zone });
        }
      });
    }

    // ADD PLACES
    if (mode === "places" || mode === "both") {
      data.places.forEach((p) => {
        L.marker(p.coords)
          .addTo(map)
          .bindPopup(`<b>${p.name}</b><br>Type: ${p.type}`);
      });
    }

    // USER LOCATION
    const userMarker = L.marker([0, 0]).addTo(map).bindPopup("You are here");
    const accuracyCircle = L.circle([0, 0], { radius: 0 }).addTo(map);

    let lastLat = null,
      lastLng = null;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const acc = pos.coords.accuracy;

        lastLat = lat;
        lastLng = lng;

        userMarker.setLatLng([lat, lng]);
        accuracyCircle.setLatLng([lat, lng]).setRadius(acc);

        map.setView([lat, lng], map.getZoom());

        checkZones(lat, lng);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    function checkZones(lat, lng) {
      if (!zoneLayers.length) return;
      const userPoint = turf.point([lng, lat]);
      const inside = [];

      zoneLayers.forEach((z) => {
        if (z.type === "polygon") {
          const coordsLngLat = z.data.coords.map((c) => [c[1], c[0]]);
          if (
            coordsLngLat[0][0] !== coordsLngLat[coordsLngLat.length - 1][0] ||
            coordsLngLat[0][1] !== coordsLngLat[coordsLngLat.length - 1][1]
          ) {
            coordsLngLat.push(coordsLngLat[0]);
          }
          const poly = turf.polygon([coordsLngLat]);
          if (turf.booleanPointInPolygon(userPoint, poly)) inside.push(z.data.name);
        } else {
          const center = [z.data.coords[1], z.data.coords[0]];
          const dist = turf.distance(userPoint, turf.point(center), { units: "meters" });
          if (dist <= (z.data.radius || 0)) inside.push(z.data.name);
        }
      });

      console.log(inside.length ? `Inside: ${inside.join(", ")}` : "Outside all zones");
    }

    const interval = setInterval(() => {
      if (lastLat && lastLng) checkZones(lastLat, lastLng);
    }, 1000);

    return () => {
      clearInterval(interval);
      navigator.geolocation.clearWatch(watchId);
      map.remove();
      leafletMapRef.current = null;
    };
  }, [data, mode]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} ></div>;
}
