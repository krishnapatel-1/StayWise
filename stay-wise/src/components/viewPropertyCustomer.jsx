import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const ViewPropertyCustomer = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/properties/${propertyId}`);
        const data = await res.json();
        if (res.ok) {
          setProperty(data);
        } else {
          console.error("❌ Failed to fetch:", data.message);
        }
      } catch (err) {
        console.error("❌ Error:", err);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (!property) return <div>Loading...</div>;

  const {
    propertyType = "Unavailable",
    furnishing = "Unavailable",
    totalArea = "Unavailable",
    floorNumber = "Unavailable",
    balcony = "Unavailable",
    balconyCount = 0,
    facing = "Unavailable",
    toLet = "Unavailable",
    electricity = "Unavailable",
    waterSupply = "Unavailable",
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
    dailyRent = "Unavailable",
    monthlyRent = "Unavailable",
    securityDeposit = "Unavailable",
    maintenanceCharges = "Unavailable",
    negotiable = false,
    pricingNote = "",
    houseFloorDetails = [],
    photos = [],
  } = property;

  const type = propertyType.toLowerCase();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const lat = parseFloat(location?.latitude);
  const lng = parseFloat(location?.longitude);

  return (
    <div className="section-container">
      <h2>Property Details</h2>
      <p><strong>Type:</strong> {propertyType}</p>
      <p><strong>Furnishing:</strong> {furnishing}</p>
      <p><strong>Total Area:</strong> {totalArea}</p>
      <p><strong>Floor Number:</strong> {floorNumber}</p>
      <p><strong>Balcony:</strong> {balcony} {balcony === "Yes" ? `(${balconyCount})` : ""}</p>
      <p><strong>Facing:</strong> {facing}</p>
      <p><strong>Status:</strong> {toLet}</p>

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
      <p><strong>Parking:</strong> {facilities.parking || "Unavailable"}</p>
      <p><strong>CCTV:</strong> {facilities.cctv ? "Yes" : "No"}</p>
      <p><strong>Guard:</strong> {facilities.guard ? "Yes" : "No"}</p>
      <p><strong>Lift:</strong> {facilities.lift ? "Yes" : "No"}</p>

      {(type === "pg room" || type === "hostel room") && (
        <>
          <h3>Services</h3>
          <p><strong>Meals Included:</strong> {services.mealsIncluded || "Unavailable"}</p>
          <p><strong>Gate Open:</strong> {services.gateOpen || "Unavailable"}</p>
          <p><strong>Gate Close:</strong> {services.gateClose || "Unavailable"}</p>
          <p><strong>Housekeeping:</strong> {services.housekeeping || "Unavailable"}</p>
          <p><strong>Laundry:</strong> {services.laundry ? "Yes" : "Unavailable"}</p>
        </>
      )}

      <h3>Pricing</h3>
      <p><strong>Daily Rent:</strong> ₹{dailyRent}</p>
      <p><strong>Monthly Rent:</strong> ₹{monthlyRent}</p>
      <p><strong>Security Deposit:</strong> ₹{securityDeposit}</p>
      <p><strong>Maintenance Charges:</strong> ₹{maintenanceCharges}</p>
      <p><strong>Negotiable:</strong> {negotiable ? "Yes" : "No"}</p>
      <p><strong>Note:</strong> {pricingNote || "None"}</p>

      <h3>Location</h3>
      <p><strong>House No:</strong> {location.houseNo || "Unavailable"}</p>
      <p><strong>Street:</strong> {location.street || "Unavailable"}</p>
      <p><strong>City:</strong> {location.city || "Unavailable"}</p>
      <p><strong>District:</strong> {location.district || "Unavailable"}</p>
      <p><strong>State:</strong> {location.state || "Unavailable"}</p>
      <p><strong>Country:</strong> {location.country || "Unavailable"}</p>
      <p><strong>Pincode:</strong> {location.pincode || "Unavailable"}</p>

      {isLoaded && !isNaN(lat) && !isNaN(lng) && (
        <div style={{ height: "400px", marginTop: "20px" }}>
          <h3>📍 Property Location</h3>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{ lat, lng }}
            zoom={15}
          >
            <Marker position={{ lat, lng }} />
          </GoogleMap>
        </div>
      )}

      {houseFloorDetails.length > 0 && type === "house" && (
        <div>
          <h3>House Floor Details</h3>
          {houseFloorDetails.map((floor, i) => (
            <div key={i}>
              <strong>Floor {i + 1}:</strong>
              <ul>
                <li>Bedrooms: {floor.bedrooms || 0}</li>
                <li>Bathrooms: {floor.bathrooms || 0}</li>
                <li>Kitchens: {floor.kitchens || 0}</li>
                <li>Halls: {floor.halls || 0}</li>
                <li>Balconies: {floor.balconies || 0}</li>
              </ul>
            </div>
          ))}
        </div>
      )}

      {photos.length > 0 && (
        <>
          <h3>Photos</h3>
          <div className="photo-grid">
            {photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo.base64}
                alt={photo.label || `Image ${idx + 1}`}
                style={{ width: "200px", height: "auto", margin: "10px" }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewPropertyCustomer;
