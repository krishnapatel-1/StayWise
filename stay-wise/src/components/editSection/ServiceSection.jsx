import React from "react";

const ServicesSection = ({ formData, setFormData, onNext, onBack }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  return (
    <div className="section-container">
      <h2>Edit Services (PG/Hostel Only)</h2>

      <label>
        Meals Included:
        <select
          name="mealsIncluded"
          value={formData.services?.mealsIncluded || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Breakfast Only">Breakfast Only</option>
          <option value="Lunch Only">Lunch Only</option>
          <option value="Dinner Only">Dinner Only</option>
          <option value="All Meals">All Meals</option>
          <option value="No Meals">No Meals</option>
        </select>
      </label>

      <label>
        Gate Open Time:
        <input
          type="time"
          name="gateOpen"
          value={formData.services?.gateOpen || ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Gate Close Time:
        <input
          type="time"
          name="gateClose"
          value={formData.services?.gateClose || ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Housekeeping:
        <input
          type="text"
          name="housekeeping"
          placeholder="e.g., Weekly, Daily"
          value={formData.services?.housekeeping || ""}
          onChange={handleChange}
        />
      </label>

      <label>
        <input
          type="checkbox"
          name="laundry"
          checked={formData.services?.laundry || false}
          onChange={handleChange}
        />
        Laundry Available
      </label>

      <div className="navigation-buttons">
        <button type="button" onClick={onBack}>Back</button>
        <button type="button" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default ServicesSection;
