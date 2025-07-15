import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GeneralSection = ({ formData, setFormData, onNext }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "propertyType") {
      const type = value.toLowerCase();
      setFormData(prev => ({
        ...prev,
        propertyType: type,
        houseFloorDetails: type === "house" ? prev.houseFloorDetails || [] : [],
        services: (type === "pg room" || type === "hostel room") ? prev.services || {} : {},
        floorNumber: type !== "house" ? prev.floorNumber || "" : "",
        balcony: type !== "house" ? prev.balcony || "No" : "No",
        balconyCount: type !== "house" ? prev.balconyCount || 0 : 0,
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (formData.propertyType === "house" && !formData.houseFloorDetails) {
      setFormData((prev) => ({
        ...prev,
        houseFloorDetails: [{ bedrooms: '', bathrooms: '', kitchens: '', halls: '', balconies: '' }],
      }));
    }
  }, [formData.propertyType]);

  const handleFloorChange = (index, field, value) => {
    const updatedFloors = [...formData.houseFloorDetails];
    updatedFloors[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      houseFloorDetails: updatedFloors,
    }));
  };

  const addFloor = () => {
    setFormData((prev) => ({
      ...prev,
      houseFloorDetails: [
        ...(prev.houseFloorDetails || []),
        { bedrooms: '', bathrooms: '', kitchens: '', halls: '', balconies: '' },
      ],
    }));
  };

  const removeFloor = (indexToRemove) => {
    const updatedFloors = formData.houseFloorDetails.filter((_, i) => i !== indexToRemove);
    setFormData((prev) => ({
      ...prev,
      houseFloorDetails: updatedFloors,
    }));
  };

  return (
    <div className="section-container">
      <h2>Edit General Details</h2>

      <label>Property Type:</label>
      <select
        name="propertyType"
        value={formData.propertyType || ""}
        onChange={handleChange}
      >
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

      <label>Furnishing:</label>
      <select
        name="furnishing"
        value={formData.furnishing || ""}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="Furnished">Furnished</option>
        <option value="Semi-Furnished">Semi-Furnished</option>
        <option value="Unfurnished">Unfurnished</option>
      </select>

      <label>Total Area (sq.ft):</label>
      <input
        type="text"
        name="totalArea"
        value={formData.totalArea || ""}
        onChange={handleChange}
      />

      {formData.propertyType !== 'house' && (
        <>
          <label>Floor Number:</label>
          <input
            type="text"
            name="floorNumber"
            value={formData.floorNumber || ""}
            onChange={handleChange}
          />

          <label>Balcony:</label>
          <select
            name="balcony"
            value={formData.balcony || ""}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          {formData.balcony === 'Yes' && (
            <>
              <label>Number of Balconies:</label>
              <input
                type="number"
                name="balconyCount"
                value={formData.balconyCount || 0}
                onChange={handleChange}
              />
            </>
          )}
        </>
      )}

      <label>Facing:</label>
      <select
        name="facing"
        value={formData.facing || ""}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="East">East</option>
        <option value="West">West</option>
      </select>

      {formData.propertyType === "house" && formData.houseFloorDetails && (
        <>
          <h4>Room Details Per Floor:</h4>
          {formData.houseFloorDetails.map((floor, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                position: 'relative'
              }}
            >
              <h5>Floor {index + 1}</h5>
              <label>Bedrooms:</label>
              <input
                type="number"
                value={floor.bedrooms}
                onChange={(e) => handleFloorChange(index, 'bedrooms', e.target.value)}
              />
              <label>Bathrooms:</label>
              <input
                type="number"
                value={floor.bathrooms}
                onChange={(e) => handleFloorChange(index, 'bathrooms', e.target.value)}
              />
              <label>Kitchens:</label>
              <input
                type="number"
                value={floor.kitchens}
                onChange={(e) => handleFloorChange(index, 'kitchens', e.target.value)}
              />
              <label>Halls:</label>
              <input
                type="number"
                value={floor.halls}
                onChange={(e) => handleFloorChange(index, 'halls', e.target.value)}
              />
              <label>Balconies:</label>
              <input
                type="number"
                value={floor.balconies}
                onChange={(e) => handleFloorChange(index, 'balconies', e.target.value)}
              />

              {formData.houseFloorDetails.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFloor(index)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#ff4d4f',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  🗑 Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addFloor}>+ Add Another Floor</button>
        </>
      )}

      <div className="navigation-buttons" style={{ marginTop: '20px' }}>
        <button type="button" onClick={() => navigate("/my-property")}>Cancel</button>
        <button type="button" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default GeneralSection;
      