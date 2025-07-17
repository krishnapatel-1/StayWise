// components/MapWithRoute.jsx
import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";

const MapWithRoute = ({ propLat, propLng }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [userPos, setUserPos] = useState(null);
  const [directions, setDirections] = useState(null);

  const handleRoute = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const origin = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserPos(origin);

        const service = new window.google.maps.DirectionsService();
        service.route(
          {
            origin,
            destination: { lat: propLat, lng: propLng },
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK") setDirections(result);
            else console.error("Directions error:", status);
          }
        );
      },
      () => alert("Location permission denied.")
    );
  };

  if (!isLoaded) return <p>Loading map…</p>;

  return (
    <>
      <button onClick={handleRoute}>🚗 Show Route from My Location</button>
      <GoogleMap
        mapContainerStyle={{ height: "300px", width: "100%" }}
        zoom={14}
        center={{ lat: propLat, lng: propLng }}
      >
        <Marker position={{ lat: propLat, lng: propLng }} label="🏠" />
        {userPos && <Marker position={userPos} label="You" />}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      {directions && (
        <p>
          Distance: {directions.routes[0].legs[0].distance.text} – 
          Time: {directions.routes[0].legs[0].duration.text}
        </p>
      )}
    </>
  );
};

export default MapWithRoute;
