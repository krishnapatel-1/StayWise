import React from "react";

const UtilitySection = ({ formData, onChange, onNext, onBack }) => {
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <div className="utility-section">
      <h2>Edit Utilities</h2>

      <label>Electricity:</label>
      <select
        name="electricity"
        value={formData.electricity || ""}
        onChange={handleSelectChange}
      >
        <option value="">Select</option>
        <option value="separate meter">Separate Meter</option>
        <option value="included">Included</option>
      </select>

      <label>Water Supply:</label>
      <select
        name="waterSupply"
        value={formData.waterSupply || ""}
        onChange={handleSelectChange}
      >
        <option value="">Select</option>
        <option value="24/7">24/7</option>
        <option value="limited">Limited</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="wifi"
          checked={formData.wifi || false}
          onChange={handleCheckboxChange}
        />
        Wi-Fi Available
      </label>

      <label>
        <input
          type="checkbox"
          name="ac"
          checked={formData.ac || false}
          onChange={handleCheckboxChange}
        />
        Air Conditioning
      </label>

      <label>
        <input
          type="checkbox"
          name="fans"
          checked={formData.fans || false}
          onChange={handleCheckboxChange}
        />
        Fans
      </label>

      <label>
        <input
          type="checkbox"
          name="geyser"
          checked={formData.geyser || false}
          onChange={handleCheckboxChange}
        />
        Geyser
      </label>

      <label>
        <input
          type="checkbox"
          name="refrigerator"
          checked={formData.refrigerator || false}
          onChange={handleCheckboxChange}
        />
        Refrigerator
      </label>

      <label>
        <input
          type="checkbox"
          name="washingMachine"
          checked={formData.washingMachine || false}
          onChange={handleCheckboxChange}
        />
        Washing Machine
      </label>

      <label>
        <input
          type="checkbox"
          name="powerBackup"
          checked={formData.powerBackup || false}
          onChange={handleCheckboxChange}
        />
        Power Backup
      </label>

      <div className="navigation-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default UtilitySection;
