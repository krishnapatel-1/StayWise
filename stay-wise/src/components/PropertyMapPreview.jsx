import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const PropertyMapPreview = ({ lat, lng }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <p>Loading map...</p>;
  if (!lat || !lng) return <p>Location not available.</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={16}
      center={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
    >
      <Marker position={{ lat: parseFloat(lat), lng: parseFloat(lng) }} />
    </GoogleMap>
  );
};

export default PropertyMapPreview;
