'use client'
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';

export default function LiveMap({ mode = "both" }) {
  const { user, logout } = useAuth0();
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const zoneLayersRef = useRef([]);
  const markerLayersRef = useRef([]);
  const focusRef = useRef(false);
  const [data, setData] = useState(null);
  const defaultCoords = [23.217319, 77.408748];

  const getPlaceIcon = (url) =>
    L.icon({ iconUrl: url, iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -30] });

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !leafletMapRef.current) {
      const map = L.map(mapRef.current).setView(defaultCoords, 13);
      leafletMapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
    }
  }, []);

  // Fetch data every second
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://sahyatri-backend.vercel.app/fetch_loc`
        );
        const json = await res.data;
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update markers and zones
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map || !data) return;

    // Clear old zones
    zoneLayersRef.current.forEach(z => map.removeLayer(z.layer));
    zoneLayersRef.current = [];

    // Draw zones
    if (mode === "zones" || mode === "both") {
      data.zones.forEach(zone => {
        let layer;
        if (Array.isArray(zone.coords[0])) {
          layer = L.polygon(zone.coords, {
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: 0.4,
          }).addTo(map).bindPopup(zone.name);
          zoneLayersRef.current.push({ type: "polygon", layer, data: zone });
        } else {
          layer = L.circle(zone.coords, {
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: 0.4,
            radius: zone.radius,
          }).addTo(map).bindPopup(zone.name);
          zoneLayersRef.current.push({ type: "circle", layer, data: zone });
        }
      });
    }

    // Clear old markers
    markerLayersRef.current.forEach(m => map.removeLayer(m));
    markerLayersRef.current = [];

    // Draw places
    if (mode === "places" || mode === "both") {
      data.places.forEach(p => {
        const icon = getPlaceIcon(p.icon);
        const marker = L.marker(p.coords, { icon }).addTo(map)
          .bindPopup(`<b>${p.name}</b><br>Type: ${p.type}`);
        markerLayersRef.current.push(marker);
      });
    }

    // **Only focus on default bounds if user location has not yet arrived**
    if (!focusRef.current && !navigator.geolocation) {
      const allLayers = [...markerLayersRef.current, ...zoneLayersRef.current.map(z => z.layer)];
      if (allLayers.length) {
        const group = L.featureGroup(allLayers);
        map.fitBounds(group.getBounds(), { padding: [50, 50] });
        focusRef.current = true;
      }
    }
  }, [data, mode]);

  // User location tracking
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map || !navigator.geolocation) return;

    const userMarker = L.marker(defaultCoords).addTo(map).bindPopup("You are here");
    const accuracyCircle = L.circle(defaultCoords, { radius: 0 }).addTo(map);

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const acc = pos.coords.accuracy;

        const res = await axios.post(
          `https://sahyatri-backend.vercel.app/update_co`,
          { name : user.name, lat, lng}
        );

        userMarker.setLatLng([lat, lng]);
        accuracyCircle.setLatLng([lat, lng]).setRadius(acc);

        // **Focus only once** on user location
        if (!focusRef.current) {
          map.setView([lat, lng], 13);
          focusRef.current = true;
        }
      },
      console.error,
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
}
