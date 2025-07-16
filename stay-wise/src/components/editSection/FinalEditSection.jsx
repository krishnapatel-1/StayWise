import React, { useState } from "react";

const FinalEditSection = ({ formData, onBack, onSubmit }) => {
  const [toLet, setToLet] = useState(formData.toLet ?? "Yes");

  const {
    propertyType,
    totalArea,
    furnishing,
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
    location = {},
    facilities = {},
    services = {},
    dailyRent,
    monthlyRent,
    securityDeposit,
    maintenanceCharges,
    negotiable,
    pricingNote,
    houseFloorDetails = [],
    photos = [],
  } = formData;

  const isHouse = propertyType?.toLowerCase() === "house";
  const isPGOrHostel = propertyType === "pg room" || propertyType === "hostel room";

  // 🧹 Filter floors that are valid (non-empty)
  const filteredFloors = houseFloorDetails.filter(
    floor =>
      floor.bedrooms || floor.bathrooms || floor.kitchens || floor.halls || floor.balconies
  );

  // 🧹 Filter photos that belong to retained floors or standard labels
  const filteredPhotos = Array.isArray(photos)
    ? photos.filter(photo => {
        if (!photo.label) return false;
        if (!isHouse) return true;
        return (
          photo.label === "Property Front View" ||
          filteredFloors.some((_, i) => photo.label.startsWith(`Floor ${i + 1}`))
        );
      })
    : [];

  const handleSubmit = () => {
    const updatedFormData = {
      ...formData,
      toLet,
      houseFloorDetails: filteredFloors,
      photos: filteredPhotos,
    };
    onSubmit(updatedFormData);
  };

  return (
    <div className="section-container">
      <h2>Review & Update</h2>

      <h3>General Info</h3>
      <p><strong>Type:</strong> {propertyType}</p>
      <p><strong>Furnishing:</strong> {furnishing}</p>
      <p><strong>Total Area:</strong> {totalArea}</p>
      {!isHouse && (
        <>
          <p><strong>Floor Number:</strong> {floorNumber}</p>
          <p><strong>Balcony:</strong> {balcony}</p>
          {balcony === "Yes" && <p><strong>Balcony Count:</strong> {balconyCount}</p>}
        </>
      )}
      <p><strong>Facing:</strong> {facing}</p>

      {isHouse && filteredFloors.length > 0 && (
        <>
          <h4>Floor-wise Rooms</h4>
          {filteredFloors.map((floor, i) => (
            <p key={i}>
              <strong>Floor {i + 1}</strong>: 
              Bedrooms: {floor.bedrooms || 0}, 
              Bathrooms: {floor.bathrooms || 0}, 
              Kitchens: {floor.kitchens || 0}, 
              Halls: {floor.halls || 0}, 
              Balconies: {floor.balconies || 0}
            </p>
          ))}
        </>
      )}

      <h3>Utilities</h3>
      <p><strong>Electricity:</strong> {electricity}</p>
      <p><strong>Water Supply:</strong> {waterSupply}</p>
      <p><strong>WiFi:</strong> {wifi ? "Yes" : "No"}</p>
      <p><strong>AC:</strong> {ac ? "Yes" : "No"}</p>
      <p><strong>Fans:</strong> {fans ? "Yes" : "No"}</p>
      <p><strong>Geyser:</strong> {geyser ? "Yes" : "No"}</p>
      <p><strong>Refrigerator:</strong> {refrigerator ? "Yes" : "No"}</p>
      <p><strong>Washing Machine:</strong> {washingMachine ? "Yes" : "No"}</p>
      <p><strong>Power Backup:</strong> {powerBackup ? "Yes" : "No"}</p>

      <h3>Facilities</h3>
      <p><strong>Parking:</strong> {facilities.parking}</p>
      <p><strong>CCTV:</strong> {facilities.cctv ? "Yes" : "No"}</p>
      <p><strong>Security Guard:</strong> {facilities.guard ? "Yes" : "No"}</p>
      <p><strong>Lift:</strong> {facilities.lift ? "Yes" : "No"}</p>

      {isPGOrHostel && (
        <>
          <h3>Services</h3>
          <p><strong>Meals Included:</strong> {services.mealsIncluded}</p>
          <p><strong>Gate Open:</strong> {services.gateOpen}</p>
          <p><strong>Gate Close:</strong> {services.gateClose}</p>
          <p><strong>Housekeeping:</strong> {services.housekeeping}</p>
          <p><strong>Laundry:</strong> {services.laundry ? "Yes" : "No"}</p>
        </>
      )}

      <h3>Location</h3>
      <p><strong>City:</strong> {location.city}</p>
      <p><strong>Street:</strong> {location.street}</p>
      <p><strong>District:</strong> {location.district}</p>
      <p><strong>State:</strong> {location.state}</p>
      <p><strong>Country:</strong> {location.country}</p>
      <p><strong>Pincode:</strong> {location.pincode}</p>

      {filteredPhotos.length > 0 && (
        <>
          <h3>Photos</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {filteredPhotos.map((photo, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <p><strong>{photo.label}</strong></p>
                <img
                  src={photo.base64}
                  alt={photo.label}
                  style={{ width: "200px", borderRadius: "8px", border: "1px solid #ccc" }}
                />
              </div>
            ))}
          </div>
        </>
      )}

      <h3>Pricing</h3>
      {dailyRent && <p><strong>Daily Rent:</strong> ₹{dailyRent}</p>}
      {monthlyRent && <p><strong>Monthly Rent:</strong> ₹{monthlyRent}</p>}
      {securityDeposit && <p><strong>Security Deposit:</strong> ₹{securityDeposit}</p>}
      {maintenanceCharges && <p><strong>Maintenance Charges:</strong> ₹{maintenanceCharges}</p>}
      <p><strong>Negotiable:</strong> {negotiable ? "Yes" : "No"}</p>
      <p><strong>Note:</strong> {pricingNote}</p>

      <h3>Rental Status</h3>
      <label>
        <input
          type="radio"
          value="Yes"
          checked={toLet === "Yes"}
          onChange={() => setToLet("Yes")}
        />
        To-Let
      </label>
      <label>
        <input
          type="radio"
          value="No"
          checked={toLet === "No"}
          onChange={() => setToLet("No")}
        />
        Not To-Let
      </label>

      <div className="navigation-buttons" style={{ marginTop: "20px" }}>
        <button onClick={onBack}>Back</button>
        <button onClick={handleSubmit}>Update Property</button>
      </div>
    </div>
  );
};

export default FinalEditSection;
