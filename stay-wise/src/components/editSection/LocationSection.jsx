import React, { useEffect } from "react";

const LocationSection = ({ formData, setFormData, onNext, onBack }) => {
  // Ensure location object is initialized
  useEffect(() => {
    if (!formData.location) {
      setFormData((prev) => ({
        ...prev,
        location: {
          houseNo: "",
          street: "",
          city: "",
          district: "",
          state: "",
          country: "",
          pincode: "",
          latitude: "",
          longitude: "",
        },
      }));
    }
  }, []);

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

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const address = data.address;

          setFormData((prev) => ({
            ...prev,
            location: {
              ...prev.location,
              latitude,
              longitude,
              street: address.road || "",
              city: address.city || address.town || "",
              district: address.county || "",
              state: address.state || "",
              country: address.country || "",
              pincode: address.postcode || "",
            },
          }));
        } catch (err) {
          console.error("Reverse geocoding failed:", err);
          alert("Failed to fetch address from coordinates.");
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Location detection failed.");
      }
    );
  };

  return (
    <div className="section-container">
      <h2>Edit Location Details</h2>

      <button type="button" onClick={detectLocation}>📍 Detect Location</button>

      <label>
        House Number:
        <input
          type="text"
          name="houseNo"
          value={formData.location?.houseNo || ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Street:
        <input
          type="text"
          name="street"
          value={formData.location?.street || ""}
          onChange={handleChange}
        />
      </label>

      <label>
        City:
        <input
          type="text"
          name="city"
          value={formData.location?.city || ""}
          onChange={handleChange}
        />
      </label>

      <label>
        District:
        <input
          type="text"
          name="district"
          value={formData.location?.district || ""}
          onChange={handleChange}
        />
      </label>

      <label>
        State:
        <input
          type="text"
          name="state"
          value={formData.location?.state || ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Country:
        <input
          type="text"
          name="country"
          value={formData.location?.country || ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Pincode:
        <input
          type="text"
          name="pincode"
          value={formData.location?.pincode || ""}
          onChange={handleChange}
        />
      </label>

      <div className="navigation-buttons">
        <button type="button" onClick={onBack}>Back</button>
        <button type="button" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default LocationSection;
