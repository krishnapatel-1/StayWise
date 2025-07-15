import React from "react";

function UtilitySection({ formData, onChange, onNext, onBack }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="section-container">
      <h2>Edit Utilities</h2>

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

      <label>
        <input type="checkbox" name="wifi" checked={formData.wifi || false} onChange={handleChange} />
        Wi-Fi
      </label>
      <label>
        <input type="checkbox" name="ac" checked={formData.ac || false} onChange={handleChange} />
        Air Conditioning
      </label>
      <label>
        <input type="checkbox" name="fans" checked={formData.fans || false} onChange={handleChange} />
        Fans
      </label>
      <label>
        <input type="checkbox" name="geyser" checked={formData.geyser || false} onChange={handleChange} />
        Geyser
      </label>
      <label>
        <input type="checkbox" name="refrigerator" checked={formData.refrigerator || false} onChange={handleChange} />
        Refrigerator
      </label>
      <label>
        <input type="checkbox" name="washingMachine" checked={formData.washingMachine || false} onChange={handleChange} />
        Washing Machine
      </label>
      <label>
        <input type="checkbox" name="powerBackup" checked={formData.powerBackup || false} onChange={handleChange} />
        Power Backup
      </label>

      <div className="navigation-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

export default UtilitySection;
