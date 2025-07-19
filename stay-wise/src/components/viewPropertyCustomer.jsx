import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
  Autocomplete,
  OverlayView
} from "@react-google-maps/api";
import { useCallback, useRef } from "react";

const libraries = ["places"];

const ViewPropertyCustomer = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const storedCoords = JSON.parse(localStorage.getItem("userLocation"));

  const [directions, setDirections] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distanceData, setDistanceData] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const autocompleteRef = useRef(null);
  const mapRef = useRef(null); // ✅ Add this here

  const user = JSON.parse(localStorage.getItem("user"));
  // const isCustomer = user?.role === "customer";

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/properties/${propertyId}`);
        const data = await res.json();
        if (res.ok) {
          setProperty(data);

          // Set destination location exists
          if (
            data.location?.latitude &&
            data.location?.longitude
          ) {
            const dest = {
              lat: parseFloat(data.location.latitude),
              lng: parseFloat(data.location.longitude),
            };
            setDestination(dest);

            if (storedCoords) calculateRoute(storedCoords, dest);
          }
        } else {
          console.error("❌ Failed to fetch:", data.message);
        }
      } catch (err) {
        console.error("❌ Error:", err);
      }
    };

    if (propertyId && isLoaded) fetchProperty();
  }, [propertyId, isLoaded]);

  const calculateRoute = useCallback((origin, destinationOverride = destination) => {
    if (!destinationOverride || !isLoaded) return;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination: destinationOverride,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          setUserLocation(origin);

          const leg = result.routes[0]?.legs[0];
          if (leg) {
            setDistanceData({
              text: leg.distance.text,
              value: leg.distance.value,
              duration: leg.duration.text,
            });
          }
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  }, [destination, isLoaded]);


  if (!property) return <div>Loading property details...</div>;
  if (!isLoaded) return <div>Loading map...</div>;

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

      <p><strong>Pincode:</strong> {location.pincode || "Unavailable"}</p>

      {isLoaded && destination && (
        <div className="map-wrapper">
          <h3>📍 Route from your location to property:</h3>

          <Autocomplete
            onLoad={(ref) => setAutocomplete(ref)}
            onPlaceChanged={() => {
              const place = autocomplete.getPlace();
              if (place?.geometry?.location) {
                const newOrigin = {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                };
                calculateRoute(newOrigin);
              }
            }}
          >
            <input
              type="text"
              placeholder="Search starting location"
              ref={autocompleteRef}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
          </Autocomplete>

          <button
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const currentLoc = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  };
                  calculateRoute(currentLoc);
                },
                (error) => {
                  alert("Unable to access location. Please allow location access.");
                  console.error(error);
                }
              );
            }}
            style={{
              marginBottom: "10px",
              padding: "6px 12px",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            📍 Use My Current Location
          </button>

          {distanceData && (
            <div style={{
              marginBottom: "10px",
              padding: "6px 12px",
              backgroundColor: "#f0f0f0",
              borderRadius: "6px",
              display: "inline-block"
            }}>
              📏 Distance: <b>{distanceData.text}</b> | 🕒 Time: <b>{distanceData.duration}</b>
            </div>
          )}

          <div className="map-container">
            <GoogleMap
              mapContainerClassName="map-inner"
              zoom={14}
              center={userLocation || destination}
              onClick={(e) => {
                const newOrigin = {
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                };
                calculateRoute(newOrigin);
              }}
            >
              {userLocation && (
                <Marker
                  position={userLocation}
                  draggable
                  icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
                  onDragEnd={(e) => {
                    const newOrigin = {
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                    };
                    calculateRoute(newOrigin);
                  }}
                />
              )}

              <Marker
                position={destination}
                icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
              />

              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{ suppressMarkers: true }}
                />
              )}

              {userLocation && (
                <>
                  <Marker
                    position={userLocation}
                    icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
                    draggable
                    onDragEnd={(e) => {
                      const newOrigin = {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                      };
                      calculateRoute(newOrigin);
                    }}
                  />
                  <OverlayView position={userLocation} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    <div className="custom-label"><b>You</b></div>
                  </OverlayView>
                </>
              )}

              {destination && (
                <>
                  <Marker
                    position={destination}
                    icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
                  />
                  <OverlayView position={destination} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    <div className="custom-label">
                      <b>Destination</b>
                    </div>
                  </OverlayView>
                </>
              )}

            </GoogleMap>
          </div>
        </div>
      )}

      <div style={{ marginTop: "10px", display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "center" }}>
          <img src="http://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="Red Pin" style={{ width: "15px", height: "15px" }} />
          <span>You</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" alt="Blue Pin" style={{ width: "15px", height: "15px" }} />
          <span>Destination</span>
        </div>
      </div>

      {!storedCoords && (
        <p style={{ color: "red" }}>📍 Please allow location access on the home page to view directions.</p>
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
