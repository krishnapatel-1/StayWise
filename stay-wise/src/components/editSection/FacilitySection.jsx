import React from 'react';

const FacilitiesSection = ({ formData, setFormData, onNext, onBack }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        facilities: {
          ...prev.facilities,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        facilities: {
          ...prev.facilities,
          [name]: value,
        },
      }));
    }
  };

  return (
    <div className="section-container">
      <h2>Edit Facilities</h2>

      <label>Parking:</label>
      <select
        name="parking"
        value={formData.facilities?.parking || ''}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="2-wheeler">2-Wheeler</option>
        <option value="4-wheeler">4-Wheeler</option>
        <option value="Both">Both</option>
        <option value="None">None</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="cctv"
          checked={formData.facilities?.cctv || false}
          onChange={handleChange}
        />
        CCTV Available
      </label>

      <label>
        <input
          type="checkbox"
          name="guard"
          checked={formData.facilities?.guard || false}
          onChange={handleChange}
        />
        Security Guard
      </label>

      <label>
        <input
          type="checkbox"
          name="lift"
          checked={formData.facilities?.lift || false}
          onChange={handleChange}
        />
        Lift
      </label>

      <div className="navigation-buttons">
        <button type="button" onClick={onBack}>Back</button>
        <button type="button" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default FacilitiesSection;
