import React from "react";
import './FinalSection.css';



const FinalSection = ({ formData, onBack, onSubmit }) => {
  const navigate = useNavigate();

  const handleFinalSubmit = async () => {
    const ownerId = localStorage.getItem("ownerId");

    try {
      const response = await fetch("http://localhost:5000/api/property/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, ownerId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Property submitted successfully!");
        onSubmit(); // ⬅️ trigger your original onSubmit flow (reset + redirect)
      } else {
        console.error("❌ Submission error:", data.message);
        alert("Submission failed!");
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("An error occurred during submission!");
    }
  };

  const {
    propertyType = "",
    furnishing,
    totalArea,
    floorNumber,
    balcony,
    balconyCount,
    facing,
    electricity,
    waterSupply,
    wifi,
    ac,
    fans,
    geyser,
    refrigerator,
    washingMachine,
    powerBackup,
    facilities = {},
    services = {},
    location = {},
    dailyRent,
    monthlyRent,
    securityDeposit,
    maintenanceCharges,
    negotiable,
    pricingNote,
    houseFloorDetails = [],
  } = formData;

  const type = propertyType.toLowerCase();

  return (
    <div className="section-container">
      <h2>Review Submitted Details</h2>

      {/* General Details */}
      <h3>General</h3>
      <p><strong>Property Type:</strong> {propertyType}</p>
      {furnishing && <p><strong>Furnishing:</strong> {furnishing}</p>}
      <p><strong>Total Area:</strong> {totalArea}</p>
      {type !== "house" && (
        <>
          <p><strong>Floor Number:</strong> {floorNumber}</p>
          <p><strong>Balcony:</strong> {balcony}</p>
          {balcony === "Yes" && (
            <p><strong>Number of Balconies:</strong> {balconyCount}</p>
          )}
        </>
      )}
      <p><strong>Facing:</strong> {facing}</p>
      {type === "house" && houseFloorDetails.length > 0 && (
        <div className="floor-room-details">
            <h4>Room Details Per Floor:</h4>
            {houseFloorDetails.map((floor, index) => (
            <div key={index} className="floor-item">
                <strong>Floor {index + 1}:</strong>
                <ul>
                <li>Bedrooms: {floor?.bedrooms || 0}</li>
                <li>Bathrooms: {floor?.bathrooms || 0}</li>
                <li>Kitchens: {floor?.kitchens || 0}</li>
                <li>Halls: {floor?.halls || 0}</li>
                <li>Balconies: {floor?.balconies || 0}</li>
                </ul>
            </div>
            ))}
        </div>
        )}


      {/* Utilities */}
      <h3>Utilities</h3>
      <p><strong>Electricity:</strong> {electricity}</p>
      <p><strong>Water Supply:</strong> {waterSupply}</p>
      <p><strong>Wi-Fi Available:</strong> {wifi ? "Yes" : "No"}</p>
      <p><strong>Air Conditioning:</strong> {ac ? "Yes" : "No"}</p>
      <p><strong>Fans:</strong> {fans ? "Yes" : "No"}</p>
      <p><strong>Geyser:</strong> {geyser ? "Yes" : "No"}</p>
      <p><strong>Refrigerator:</strong> {refrigerator ? "Yes" : "No"}</p>
      <p><strong>Washing Machine:</strong> {washingMachine ? "Yes" : "No"}</p>
      <p><strong>Power Backup:</strong> {powerBackup ? "Yes" : "No"}</p>

      {/* Facilities */}
      <h3>Facilities</h3>
      <p><strong>Parking:</strong> {facilities.parking || "Not specified"}</p>
      <p><strong>CCTV:</strong> {facilities.cctv ? "Yes" : "No"}</p>
      <p><strong>Security Guard:</strong> {facilities.guard ? "Yes" : "No"}</p>
      <p><strong>Lift/Elevator:</strong> {facilities.lift ? "Yes" : "No"}</p>

      {/* Services (Only for PG/Hostel) */}
      {(type === "pg" || type === "hostel room") && (
        <>
          <h3>Services</h3>
          <p><strong>Mess Included:</strong> {services.mealsIncluded || "Not specified"}</p>
          <p><strong>Gate Opening Time:</strong> {services.gateOpen || "Not specified"}</p>
          <p><strong>Gate Closing Time:</strong> {services.gateClose || "Not specified"}</p>
          <p><strong>Housekeeping:</strong> {services.housekeeping || "Not specified"}</p>
          <p><strong>Laundry Services:</strong> {services.laundry ? "Yes" : "No"}</p>
        </>
      )}

      {/* Location */}
      <h3>Location</h3>
      <p><strong>House No:</strong> {location.houseNo}</p>
      <p><strong>Street:</strong> {location.street}</p>
      <p><strong>City:</strong> {location.city}</p>
      <p><strong>District:</strong> {location.district}</p>
      <p><strong>State:</strong> {location.state}</p>
      <p><strong>Country:</strong> {location.country}</p>
      <p><strong>Pincode:</strong> {location.pincode}</p>

      {/* Pricing */}
      <h3>Pricing:</h3>
        {formData.dailyRent && (
        <p><strong>Rent per 24 Hours:</strong> ₹{formData.dailyRent}</p>
        )}
        {formData.monthlyRent && (
        <>
            <p><strong>Monthly Rent:</strong> ₹{formData.monthlyRent}</p>
            <p><strong>Security Deposit:</strong> ₹{formData.securityDeposit}</p>
            <p><strong>Maintenance Charges:</strong> ₹{formData.maintenanceCharges}</p>
            <p><strong>Negotiable:</strong> {formData.negotiable ? "Yes" : "No"}</p>
        </>
        )}
        {formData.pricingNote && (
        <p><strong>Additional Notes:</strong> {formData.pricingNote}</p>
        )}

      {/* Navigation */}
      <div className="navigation-buttons" style={{ marginTop: "20px" }}>
        <button onClick={onBack}>Back</button>
        <button onClick={handleFinalSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default FinalSection;
