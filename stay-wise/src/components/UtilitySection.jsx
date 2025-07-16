import React from 'react';
import './UtilitySection.css';

const UtilitySection = ({ formData, setFormData, onBack, onNext }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="section-container">
      <h2>Utilities</h2>

      <label>Electricity:</label>
      <select name="electricity" value={formData.electricity || ''} onChange={handleChange}>
        <option value="">Select</option>
        <option value="separate meter">Separate Meter</option>
        <option value="included">Included</option>
      </select>

      <label>Water Supply:</label>
      <select name="waterSupply" value={formData.waterSupply || ''} onChange={handleChange}>
        <option value="">Select</option>
        <option value="24/7">24/7</option>
        <option value="limited">Limited</option>
      </select>

        <div className="checkbox-field">
        <label className="clickable-label">
            Wi-Fi Available
            <input
            type="checkbox"
            name="wifi"
            checked={formData.wifi || false}
            onChange={handleChange}
            />
        </label>
        </div>

        <div className="checkbox-field">
        <label className="clickable-label">
            Air Conditioning
            <input
            type="checkbox"
            name="ac"
            checked={formData.ac || false}
            onChange={handleChange}
            />
        </label>
        </div>

        <div className="checkbox-field">
        <label className="clickable-label">
            Fans
            <input
            type="checkbox"
            name="fans"
            checked={formData.fans || false}
            onChange={handleChange}
            />
        </label>
        </div>

        <div className="checkbox-field">
        <label className="clickable-label">
            Geyser
            <input
            type="checkbox"
            name="geyser"
            checked={formData.geyser || false}
            onChange={handleChange}
            />
        </label>
        </div>

        <div className="checkbox-field">
        <label className="clickable-label">
            Refrigerator
            <input
            type="checkbox"
            name="refrigerator"
            checked={formData.refrigerator || false}
            onChange={handleChange}
            />
        </label>
        </div>

        <div className="checkbox-field">
        <label className="clickable-label">
            Washing Machine
            <input
            type="checkbox"
            name="washingMachine"
            checked={formData.washingMachine || false}
            onChange={handleChange}
            />
        </label>
        </div>

<div className="checkbox-field">
  <label className="clickable-label">
    Power Backup
    <input
      type="checkbox"
      name="powerBackup"
      checked={formData.powerBackup || false}
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

export default UtilitySection;