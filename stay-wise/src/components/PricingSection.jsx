import React from 'react';
import './PricingSection.css';

const PricingSection = ({ formData, setFormData, onBack, onNext }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const type = formData.propertyType?.toLowerCase();

  return (
    <div className="section-container">
      <h2>Pricing Details</h2>

      {(type === "single room" || type === "double room") ? (
        <>
          <label>Rent per 24 Hours (₹):</label>
          <input
            type="number"
            name="dailyRent"
            value={formData.dailyRent || ''}
            onChange={handleChange}
          />
        </>
      ) : (
        <>
          <label>Monthly Rent (₹):</label>
          <input
            type="number"
            name="monthlyRent"
            value={formData.monthlyRent || ''}
            onChange={handleChange}
          />

          <label>Security Deposit (₹):</label>
          <input
            type="number"
            name="securityDeposit"
            value={formData.securityDeposit || ''}
            onChange={handleChange}
          />

          <label>Maintenance Charges (₹):</label>
          <input
            type="number"
            name="maintenanceCharges"
            value={formData.maintenanceCharges || ''}
            onChange={handleChange}
          />

          <div className="checkbox-container">
            <label htmlFor="negotiable">Is the rent negotiable?</label>
            <input
              type="checkbox"
              name="negotiable"
              checked={formData.negotiable || false}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      <label>Additional Pricing Notes (optional):</label>
      <textarea
        name="pricingNote"
        rows="3"
        value={formData.pricingNote || ''}
        onChange={handleChange}
      />

      <div className="navigation-buttons">
        <button type="button" onClick={onBack}>Back</button>
        <button type="button" onClick={onNext}>Submit</button>
      </div>
    </div>
  );
};

export default PricingSection;
