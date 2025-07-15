import React, { useEffect } from 'react';

const GeneralSection = ({ formData, setFormData, onNext }) => {
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
  console.log("Loaded property type:", formData.propertyType);
}, [formData.propertyType]);


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

  return (
    <div className="section-container">
      <h2>Edit General Details</h2>

      <label>Property Type:</label>
    <select
    name="propertyType"
    value={formData.propertyType || ""}
    onChange={(e) =>
        setFormData((prev) => ({
        ...prev,
        propertyType: e.target.value,
        }))
    }
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
    onChange={(e) =>
        setFormData((prev) => ({
        ...prev,
        furnishing: e.target.value,
        }))
    }
    >
    <option value="">Select</option>
    <option value="Furnished">Furnished</option>
    <option value="Semi-Furnished">Semi-Furnished</option>
    <option value="Unfurnished">Unfurnished</option>
    </select>electricity 


      <label>Total Area (sq.ft):</label>
      <input type="text" name="totalArea" value={formData.totalArea} onChange={handleChange} />

      {formData.propertyType !== 'house' && (
        <>
          <label>Floor Number:</label>
          <input type="text" name="floorNumber" value={formData.floorNumber} onChange={handleChange} />

          <label>Balcony:</label>
          <select name="balcony" value={formData.balcony} onChange={handleChange}>
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
                value={formData.balconyCount}
                onChange={handleChange}
              />
            </>
          )}
        </>
      )}

      <label>Facing:</label>
      <input type="text" name="facing" value={formData.facing} onChange={handleChange} />

      {formData.propertyType === "house" && formData.houseFloorDetails && (
        <>
          <h4>Room Details Per Floor:</h4>
          {formData.houseFloorDetails.map((floor, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
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
            </div>
          ))}
          <button type="button" onClick={addFloor}>+ Add Another Floor</button>
        </>
      )}

      <div className="navigation-buttons">
        <button type="button" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default GeneralSection;
