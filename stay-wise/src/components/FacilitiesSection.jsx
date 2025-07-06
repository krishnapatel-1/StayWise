import React from 'react';
import './FacilitiesSection.css';

const FacilitiesSection = ({ formData, setFormData, onBack, onNext }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [name]: checked,
      },
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [name]: value,
      },
    }));
  };

  const facilities = formData.facilities || {};

  return (
    <div className="section-container">
      <h2>Facilities</h2>

      <div className="facility-item">
        <label htmlFor="parking">Parking:</label>
        <select
          name="parking"
          value={facilities.parking || ""}
          onChange={handleSelectChange}
        >
          <option value="">Select</option>
          <option value="2-wheeler">2-Wheeler</option>
          <option value="4-wheeler">4-Wheeler</option>
          <option value="bicycle">Bicycle</option>
          <option value="none">None</option>
        </select>
      </div>

      {facilities.parking && (
        <p className="selected-parking">Selected: {facilities.parking}</p>
      )}

        <div className="facility-item">
        <label className="clickable-label">
            CCTV
            <input
            type="checkbox"
            name="cctv"
            checked={facilities.cctv || false}
            onChange={handleCheckboxChange}
            />
        </label>
        </div>

        <div className="facility-item">
        <label className="clickable-label">
            Security Guard
            <input
            type="checkbox"
            name="guard"
            checked={facilities.guard || false}
            onChange={handleCheckboxChange}
            />
        </label>
        </div>

        <div className="facility-item">
        <label className="clickable-label">
            Lift/Elevator
            <input
            type="checkbox"
            name="lift"
            checked={facilities.lift || false}
            onChange={handleCheckboxChange}
            />
        </label>
        </div>


      <div className="navigation-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default FacilitiesSection;
