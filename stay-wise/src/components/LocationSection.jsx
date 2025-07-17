import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoogleMap, Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

const LocationSection = ({ formData, setFormData, onNext, onBack }) => {
  const [error, setError] = useState("");
  const [markerPlaced, setMarkerPlaced] = useState(false);
  const [mapRef, setMapRef] = useState(null);
  const [marker, setMarker] = useState({
    lat: parseFloat(formData?.location?.latitude) || defaultCenter.lat,
    lng: parseFloat(formData?.location?.longitude) || defaultCenter.lng,
  });

  const autocompleteRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const location = formData.location || {};

  const reverseGeocode = useCallback(async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (!data.results || data.results.length === 0) return;

      const components = data.results[0].address_components;

      const getAddressComponent = (types) =>
        components.find((c) => types.every((t) => c.types.includes(t)))?.long_name || "";

      const updatedLocation = {
        latitude: lat,
        longitude: lng,
        houseNo: getAddressComponent(["street_number"]),
        street: getAddressComponent(["route"]),
        city:
          getAddressComponent(["locality"]) ||
          getAddressComponent(["sublocality"]) ||
          getAddressComponent(["administrative_area_level_2"]),
        district: getAddressComponent(["administrative_area_level_2"]),
        state: getAddressComponent(["administrative_area_level_1"]),
        country: getAddressComponent(["country"]),
        pincode: getAddressComponent(["postal_code"]),
      };

      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          ...updatedLocation,
        },
      }));
    } catch (err) {
      console.error("Reverse geocoding failed:", err);
    }
  }, [setFormData]);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setMarker({ lat, lng });
        setMarkerPlaced(true);
        reverseGeocode(lat, lng);
        if (mapRef) mapRef.panTo({ lat, lng });
      },
      () => setError("Location access denied.")
    );
  };

  const handlePlaceChange = () => {
    const autocomplete = autocompleteRef.current;
    if (!autocomplete) return;

    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setMarker({ lat, lng });
    setMarkerPlaced(true);
    reverseGeocode(lat, lng);
    if (mapRef) mapRef.panTo({ lat, lng });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="section-container">
      <h2>📍 Location</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleUseMyLocation}>Use My Location</button>

      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChange}
      >
        <input
          type="text"
          placeholder="Search location (city, street, etc.)"
          style={{
            width: "100%",
            padding: "0.5rem",
            margin: "1rem 0",
            fontSize: "1rem",
          }}
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={markerPlaced ? 18 : 10}
        center={marker}
        onLoad={(map) => setMapRef(map)}
        onClick={(e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          setMarker({ lat, lng });
          setMarkerPlaced(true);
          reverseGeocode(lat, lng);
          if (mapRef) mapRef.panTo({ lat, lng });
        }}
      >
        <Marker
          position={marker}
          draggable
          onDragEnd={(e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setMarker({ lat, lng });
            setMarkerPlaced(true);
            reverseGeocode(lat, lng);
            if (mapRef) mapRef.panTo({ lat, lng });
          }}
        />
      </GoogleMap>

      {!markerPlaced && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          ⚠️ Please place the red marker on your house location to continue.
        </p>
      )}

      <p style={{ marginTop: "10px" }}>Drag the red marker to your house for a better experience.</p>

      <label>House No:</label>
      <input name="houseNo" value={location.houseNo || ""} onChange={handleChange} />

      <label>Street:</label>
      <input name="street" value={location.street || ""} onChange={handleChange} />

      <label>City:</label>
      <input name="city" value={location.city || ""} onChange={handleChange} />

      <label>District:</label>
      <input name="district" value={location.district || ""} onChange={handleChange} />

      <label>State:</label>
      <select name="state" value={location.state || ""} onChange={handleChange}>
        <option value="">Select State</option>
        {[
          "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
          "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
          "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
          "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
          "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh"
        ].map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <label>Country:</label>
      <input name="country" value={location.country || "India"} onChange={handleChange} />

      <label>Pincode:</label>
      <input name="pincode" value={location.pincode || ""} onChange={handleChange} />

      <div className="navigation-buttons" style={{ marginTop: "1rem" }}>
        <button onClick={onBack}>Back</button>
        <button onClick={onNext} disabled={!markerPlaced}>Next</button>
      </div>
    </div>
  );
};

export default LocationSection;
