import React from 'react';
import './ServicesSection.css';

const ServicesSection = ({ formData, setFormData, onBack, onNext }) => {
  const services = formData.services || {};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [name]: fieldValue,
      },
    }));
  };

  return (
    <div className="section-container">
      <h2>Services</h2>

      <div className="service-item">
        <label>Mess Included:</label>
        <select
          name="mealsIncluded"
          value={services.mealsIncluded || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="service-item">
        <label>Gate Timings:</label>

        <div className="timing-group">
          <div className="timing-field">
            <label>Gate Opening Time:</label>
            <input
              type="time"
              name="gateOpen"
              value={services.gateOpen || ""}
              onChange={handleChange}
            />
          </div>
          <div className="timing-field">
            <label>Gate Closing Time:</label>
            <input
              type="time"
              name="gateClose"
              value={services.gateClose || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="service-item">
        <label>Housekeeping:</label>
        <select
          name="housekeeping"
          value={services.housekeeping || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="none">None</option>
        </select>
      </div>

      <div className="service-item checkbox-row">
        <label className="clickable-label">
            Laundry Services
            <input
            type="checkbox"
            name="laundry"
            checked={services.laundry || false}
            onChange={handleChange}
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

export default ServicesSection;
