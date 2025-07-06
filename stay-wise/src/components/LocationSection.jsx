import React, { useState } from 'react';

const LocationSection = ({ formData, setFormData, onNext, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        // alert(`📍 Location fetched!\nLatitude: ${latitude}\nLongitude: ${longitude}\nAccuracy: ${accuracy.toFixed(2)} meters`);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const updatedLocation = {
            latitude,
            longitude,
            houseNo: "",
            street: data.address.road || "",
            city: data.address.city || data.address.town || data.address.village || "",
            district: data.address.county || "",
            state: data.address.state || "",
            country: data.address.country || "India",
            pincode: data.address.postcode || "",
          };

          setFormData((prev) => ({
            ...prev,
            location: updatedLocation,
          }));

          setError("");
        } catch (err) {
          console.error(err);
          setError("Failed to fetch address.");
        }

        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Failed to get location.");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
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

  const location = formData.location || {};

  return (
    <div className="section-container">
      <h2>Location</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={fetchLocation} disabled={loading}>
        {loading ? "Fetching..." : "Use My Location"}
      </button>

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
      <input name="country" value={location.country || "India"} onChange={handleChange} readOnly />
      <label>Pincode:</label>
      <input name="pincode" value={location.pincode || ""} onChange={handleChange} />

      <div className="navigation-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default LocationSection;
