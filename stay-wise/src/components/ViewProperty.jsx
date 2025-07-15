import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewProperty.css";

function ViewProperty() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProperty = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/properties/${propertyId}`);
      const data = await res.json();
      setProperty(data);
    } catch (error) {
      console.error("❌ Error fetching property:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const toggleToLet = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/properties/${propertyId}/tolet`, {
        method: "PATCH",
      });
      const data = await res.json();
      alert(data.message);
      fetchProperty(); // Refresh after toggle
    } catch (err) {
      console.error("❌ Error toggling To-Let:", err);
    }
  };

  if (loading) return <div className="property-container">Loading...</div>;
  if (!property) return <div className="property-container">Property not found.</div>;

  const {
    propertyType,
    totalArea,
    toLet,
    location = {},
    photos = [],
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
    facilities = {},
    services = {},
    dailyRent,
    monthlyRent,
    securityDeposit,
    maintenanceCharges,
    negotiable,
    pricingNote,
    houseFloorDetails = [],
  } = property;

  return (
    <div className="property-container">
      <h2>Property Details</h2>

      <p><strong>Type:</strong> {propertyType}</p>
      <p><strong>Furnishing:</strong> {furnishing}</p>
      <p><strong>Total Area:</strong> {totalArea}</p>
      <p><strong>Floor Number:</strong> {floorNumber}</p>
      <p><strong>Balcony:</strong> {balcony} {balcony === "Yes" ? `(${balconyCount})` : ""}</p>
      <p><strong>Facing:</strong> {facing}</p>
      <p><strong>To-Let Status:</strong> {toLet}</p>
      <button onClick={toggleToLet}>
        Toggle To-Let
      </button>
      <button onClick={() => navigate("/my-property")} style={{ backgroundColor: "#dc3545", marginLeft: "10px" }}>
        Close
      </button>

      <button onClick={() => navigate(`/edit-property/${property._id}`)} style={{marginLeft: "10px"}}>
        Edit Details
      </button>

      <h3>Location</h3>
      <p><strong>City:</strong> {location.city}</p>
      <p><strong>Street:</strong> {location.street}</p>
      <p><strong>Pincode:</strong> {location.pincode}</p>
      <p><strong>State:</strong> {location.state}</p>
      <p><strong>Country:</strong> {location.country}</p>

      <h3>Utilities</h3>
      <p><strong>Electricity:</strong> {electricity}</p>
      <p><strong>Water Supply:</strong> {waterSupply}</p>
      <p><strong>Wi-Fi:</strong> {wifi ? "Yes" : "No"}</p>
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

      {(propertyType === "pg room" || propertyType === "hostel room") && (
        <>
          <h3>Services</h3>
          <p><strong>Meals:</strong> {services.mealsIncluded}</p>
          <p><strong>Gate Open:</strong> {services.gateOpen}</p>
          <p><strong>Gate Close:</strong> {services.gateClose}</p>
          <p><strong>Housekeeping:</strong> {services.housekeeping}</p>
          <p><strong>Laundry:</strong> {services.laundry ? "Yes" : "No"}</p>
        </>
      )}

      {houseFloorDetails.length > 0 && (
        <>
          <h3>House Room Details Per Floor</h3>
          {houseFloorDetails.map((floor, i) => (
            <div key={i}>
              <p><strong>Floor {i + 1}</strong> - Bedrooms: {floor.bedrooms}, Bathrooms: {floor.bathrooms}, Kitchens: {floor.kitchens}, Halls: {floor.halls}, Balconies: {floor.balconies}</p>
            </div>
          ))}
        </>
      )}

      <h3>Pricing</h3>
      {dailyRent && <p><strong>Daily Rent:</strong> ₹{dailyRent}</p>}
      {monthlyRent && <p><strong>Monthly Rent:</strong> ₹{monthlyRent}</p>}
      {securityDeposit && <p><strong>Security Deposit:</strong> ₹{securityDeposit}</p>}
      {maintenanceCharges && <p><strong>Maintenance Charges:</strong> ₹{maintenanceCharges}</p>}
      <p><strong>Negotiable:</strong> {negotiable ? "Yes" : "No"}</p>
      <p><strong>Pricing Note:</strong> {pricingNote}</p>

      <h3>Photos</h3>
      <div className="photo-grid">
        {photos.map((photo, idx) => (
          <div className="photo-card" key={idx}>
            <p>{photo.label}</p>
            <img src={photo.base64} alt={photo.label} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewProperty;
