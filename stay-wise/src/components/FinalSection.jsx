import React from "react";
import { useNavigate } from 'react-router-dom';
import './FinalSection.css';

const FinalSection = ({ formData, onBack, onSubmit }) => {
  const navigate = useNavigate();

  const handleFinalSubmit = async () => {
    const ownerId = localStorage.getItem("ownerId");
    const user=JSON.parse(localStorage.getItem('user'));
    console.log(user);
    console.log(ownerId);

    if (!ownerId) {
      alert("❌ Owner ID not found. Please log in again.");
      return;
    }

    // Set default "Unavailable" for services
    const completeServices = (type === "pg room" || type === "hostel room")
    ? {
        mealsIncluded: formData.services?.mealsIncluded || "Unavailable",
        gateOpen: formData.services?.gateOpen || "Unavailable",
        gateClose: formData.services?.gateClose || "Unavailable",
        housekeeping: formData.services?.housekeeping || "Unavailable",
        laundry: formData.services?.laundry ?? false,
      }
    : {};

    // Set default "Unavailable" for facilities
    const completeFacilities = {
      parking: formData.facilities?.parking || "Unavailable",
      cctv: formData.facilities?.cctv ?? false,
      guard: formData.facilities?.guard ?? false,
      lift: formData.facilities?.lift ?? false,
    };

    const completeUtilities = {
    electricity: formData.electricity || "Unavailable",
    waterSupply: formData.waterSupply || "Unavailable",
    wifi: formData.wifi ?? false,
    ac: formData.ac ?? false,
    fans: formData.fans ?? false,
    geyser: formData.geyser ?? false,
    refrigerator: formData.refrigerator ?? false,
    washingMachine: formData.washingMachine ?? false,
    powerBackup: formData.powerBackup ?? false,
  };

    // Convert photo object {label: {name, type, base64}} => array
    const photoArray = Object.entries(formData.photos || {}).map(([label, file]) => ({
      label,
      ownerId,
      name: file.name,
      type: file.type,
      base64: file.base64,
    }));

    const payload = {
      ...formData,
      user,
      ownerId,
      photos: photoArray,
      services: completeServices,
      utilities: completeUtilities,
      facilities: completeFacilities,
      location: {
        ...formData.location,
        latitude: formData.location?.latitude || "Unavailable",
        longitude: formData.location?.longitude || "Unavailable",
      },
    };


    // console.log("📤 Final Payload:", payload);

    try {
      const response = await fetch("http://localhost:4000/api/properties/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Property submitted successfully!");
        onSubmit(); // Reset + redirect
      } else {
        console.log(data.user)
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
      {(type === "pg room" || type === "hostel room") && (
        <>
          <h3>Services</h3>
          <p><strong>Mess Included:</strong> {services.mealsIncluded || "Service unavailable"}</p>
          <p><strong>Gate Opening Time:</strong> {services.gateOpen || "Service unavailable"}</p>
          <p><strong>Gate Closing Time:</strong> {services.gateClose || "Service unavailable"}</p>
          <p><strong>Housekeeping:</strong> {services.housekeeping || "Service unavailable"}</p>
          <p><strong>Laundry Services:</strong> {services.laundry === true ? "Yes" : "Service unavailable"}</p>
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
      {dailyRent && (
        <p><strong>Rent per 24 Hours:</strong> ₹{dailyRent}</p>
      )}
      {monthlyRent && (
        <>
          <p><strong>Monthly Rent:</strong> ₹{monthlyRent}</p>
          <p><strong>Security Deposit:</strong> ₹{securityDeposit}</p>
          <p><strong>Maintenance Charges:</strong> ₹{maintenanceCharges}</p>
          <p><strong>Negotiable:</strong> {negotiable ? "Yes" : "No"}</p>
        </>
      )}
      {pricingNote && (
        <p><strong>Additional Notes:</strong> {pricingNote}</p>
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
