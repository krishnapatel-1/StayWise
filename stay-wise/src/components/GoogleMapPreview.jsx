import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const GoogleMapPreview = ({ latitude, longitude, setCoordinates }) => {
  const center = {
    lat: latitude || 20.5937, // default to India
    lng: longitude || 78.9629,
  };

  const [markerPosition, setMarkerPosition] = useState(
    latitude && longitude ? { lat: latitude, lng: longitude } : null
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const handleMapClick = useCallback((e) => {
    const clickedLat = e.latLng.lat();
    const clickedLng = e.latLng.lng();

    setMarkerPosition({ lat: clickedLat, lng: clickedLng });
    if (setCoordinates) {
      setCoordinates(clickedLat, clickedLng);
    }
  }, [setCoordinates]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markerPosition || center}
      zoom={15}
      onClick={handleMapClick}
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
};

export default React.memo(GoogleMapPreview);
