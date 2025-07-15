import React from "react";

const PricingSection = ({ formData, setFormData, onNext, onBack }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="section-container">
      <h2>Edit Pricing Details</h2>

      <label>
        Daily Rent (24 hours):
        <input
          type="number"
          name="dailyRent"
          value={formData.dailyRent || ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Monthly Rent:
        <input
          type="number"
          name="monthlyRent"
          value={formData.monthlyRent || ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Security Deposit:
        <input
          type="number"
          name="securityDeposit"
          value={formData.securityDeposit || ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Maintenance Charges:
        <input
          type="number"
          name="maintenanceCharges"
          value={formData.maintenanceCharges || ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Negotiable:
        <input
          type="checkbox"
          name="negotiable"
          checked={formData.negotiable || false}
          onChange={handleChange}
        />
      </label>

      <label>
        Pricing Note:
        <textarea
          name="pricingNote"
          rows="3"
          value={formData.pricingNote || ""}
          onChange={handleChange}
        />
      </label>

      <div className="navigation-buttons">
        <button type="button" onClick={onBack}>Back</button>
        <button type="button" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default PricingSection;
