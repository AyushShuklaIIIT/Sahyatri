import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from "react-redux";
import { setIsInRedZone, setWarningDisplayed } from "../../store/redZoneSlice";

export default function LiveMap({ mode = "both" }) {
  const dispatch = useDispatch();
  const { user, logout } = useAuth0();
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const zoneLayersRef = useRef([]);
  const markerLayersRef = useRef([]);
  const focusRef = useRef(false);
  const [data, setData] = useState(null);
  const defaultCoords = [23.217319, 77.408748];
  const [locator, setlocator] = useState(null);

  useEffect(() => {
    const func = async () => {
      const locat = await L.icon({
        iconUrl: 'https://img.favpng.com/9/8/10/computer-icons-google-maps-locator-map-png-favpng-QV6Yi1hU8xM0Khsb8Tdks04Ur.jpg',          // path relative to public
        iconSize: [32, 32],                 // size of the icon in pixels
        iconAnchor: [16, 32],               // point of the icon which will correspond to marker's location
        popupAnchor: [0, -32],              // point from which the popup should open relative to iconAnchor
      });
      setlocator(locat)
    }
    func();
  }, []);
  

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

  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map || !navigator.geolocation || !locator) return;

    const userMarker = L.marker(defaultCoords, {icon: locator}).addTo(map).bindPopup("You are here");
    const accuracyCircle = L.circle(defaultCoords, { radius: 0 }).addTo(map);

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const acc = pos.coords.accuracy;

        // update server
        await axios.post(
          `https://sahyatri-backend.vercel.app/update_co`,
          { name: user.name, lat, lng}
        );

        userMarker.setLatLng([lat, lng]);
        accuracyCircle.setLatLng([lat, lng]).setRadius(acc);

        // ✅ Check if inside any red zone
        let insideRed = false;
        if (data && data.zones) {
          for (const z of data.zones) {
            if (z.color?.toLowerCase() === 'red') {
              if (Array.isArray(z.coords[0])) {
                // polygon
                const polygon = L.polygon(z.coords);
                if (polygon.getBounds().contains([lat, lng])) {
                  insideRed = true;
                  break;
                }
              } else {
                // circle
                const distance = map.distance([lat, lng], z.coords);
                if (distance <= z.radius) {
                  insideRed = true;
                  break;
                }
              }
            }
          }
        }

        dispatch(setIsInRedZone(insideRed))

        if(!insideRed) {
          dispatch(setWarningDisplayed(false));
        }
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
  }, [data]); // <- depend on data so you have zones available


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

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
}