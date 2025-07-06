import React, { useState, useEffect } from 'react';
import './GeneralSection.css';

const GeneralSection = ({ formData, setFormData, onNext, onBack }) => {
  const [floorDetails, setFloorDetails] = useState(formData.houseFloorDetails || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFloorDetailChange = (floorIndex, field, value) => {
    const updatedFloors = [...floorDetails];
    if (!updatedFloors[floorIndex]) updatedFloors[floorIndex] = {};
    updatedFloors[floorIndex][field] = value;
    setFloorDetails(updatedFloors);
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, houseFloorDetails: floorDetails }));
  }, [floorDetails]);

  const propertyType = formData.propertyType || '';
  const totalFloors = parseInt(formData.totalFloors || 0);

  return (
    <div className="section-container">
      <h2>General Details</h2>

      <label>Property Type:</label>
      <select name="propertyType" value={propertyType} onChange={handleChange}>
        <option value="">Select</option>
        <option value="single room">Single Room</option>
        <option value="double room">Double Room</option>
        <option value="1bhk">1BHK</option>
        <option value="2bhk">2BHK</option>
        <option value="3bhk">3BHK</option>
        <option value="pg room">PG Room</option>
        <option value="hostel room">Hostel Room</option>
        <option value="house">House</option>
      </select>

      {["1bhk", "2bhk", "3bhk", "house"].includes(propertyType) && (
        <>
          <label>Furnishing:</label>
          <select name="furnishing" value={formData.furnishing || ""} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Furnished">Furnished</option>
            <option value="Semi-furnished">Semi-furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </>
      )}

      <label>Total Area (in square feet):</label>
      <input
        type="number"
        name="totalArea"
        min="0"
        value={formData.totalArea || ""}
        onChange={handleChange}
      />

      
      {propertyType !== 'house' && (
        <>
          <label>Floor Number:</label>
          <input type="text" name="floorNumber" value={formData.floorNumber || ""} onChange={handleChange} />
        </>
      )}

      {propertyType === "house" && (
        <>
          <label>Total Floors:</label>
          <input
            type="number"
            name="totalFloors"
            value={formData.totalFloors || ""}
            onChange={handleChange}
          />

          {Array.from({ length: totalFloors }, (_, i) => (
            <div key={i} className="floor-details">
              <h4>Floor {i + 1}:</h4>
              <label>Bedrooms:</label>
              <input
                type="number"
                value={floorDetails[i]?.bedrooms || ''}
                onChange={(e) => handleFloorDetailChange(i, 'bedrooms', e.target.value)}
              />
              <label>Bathrooms:</label>
              <input
                type="number"
                value={floorDetails[i]?.bathrooms || ''}
                onChange={(e) => handleFloorDetailChange(i, 'bathrooms', e.target.value)}
              />
              <label>Kitchens:</label>
              <input
                type="number"
                value={floorDetails[i]?.kitchens || ''}
                onChange={(e) => handleFloorDetailChange(i, 'kitchens', e.target.value)}
              />
              <label>Halls:</label>
              <input
                type="number"
                value={floorDetails[i]?.halls || ''}
                onChange={(e) => handleFloorDetailChange(i, 'halls', e.target.value)}
              />
              <label>Balconies:</label>
              <input
                type="number"
                value={floorDetails[i]?.balconies || ''}
                onChange={(e) => handleFloorDetailChange(i, 'balconies', e.target.value)}
              />
            </div>
          ))}
        </>
      )}

      {(propertyType === "pg room" || propertyType === "hostel room") && (
        <>
          <label>Sharing with how many persons?</label>
          <input
            type="number"
            name="sharingCount"
            value={formData.sharingCount || ""}
            onChange={handleChange}
          />
        </>
      )}

      {propertyType !== 'house' && (
        <>
          <label>Balcony:</label>
          <select name="balcony" value={formData.balcony || ""} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          {formData.balcony === "Yes" && (
            <>
              <label>Number of Balconies:</label>
              <input
                type="number"
                name="balconyCount"
                value={formData.balconyCount || ""}
                onChange={handleChange}
              />
            </>
          )}
        </>
      )}

      <label>Facing:</label>
      <select name="facing" value={formData.facing || ""} onChange={handleChange}>
        <option value="">Select</option>
        <option value="East">East</option>
        <option value="West">West</option>
        <option value="North">North</option>
        <option value="South">South</option>
      </select>

      <div className="navigation-buttons">
        <button type="button" onClick={onBack} disabled>Back</button>
        <button type="button" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default GeneralSection;
