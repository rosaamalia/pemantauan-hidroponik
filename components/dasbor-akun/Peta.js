"use client";

import { memo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Peta = ({ currentLocation }) => {
  const { latitude, longitude, address } = currentLocation;
  const marker = L.icon({ iconUrl: "/images/leaflet/marker-icon.png" });

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "200px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={marker}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Peta;
