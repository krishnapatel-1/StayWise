import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewPropertyOwner.css";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
  Autocomplete,
  OverlayView,
} from "@react-google-maps/api";

const libraries = ["places"];

function ViewProperty() {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [directions, setDirections] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [distanceData, setDistanceData] = useState(null);

  const autocompleteRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const isCustomer = user?.role === "customer";
  const isOwner = user?.role === "owner";
  const storedCoords = JSON.parse(localStorage.getItem("userLocation"));

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const calculateRoute = useCallback(
    (origin) => {
      if (!destination || !isLoaded) return;
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
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
    },
    [destination, isLoaded]
  );

  const fetchProperty = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/properties/${propertyId}`);
      const data = await res.json();
      setProperty(data);

      if (isCustomer && data.location?.latitude && data.location?.longitude) {
        const dest = {
          lat: parseFloat(data.location.latitude),
          lng: parseFloat(data.location.longitude),
        };
        setDestination(dest);
        if (storedCoords) calculateRoute(storedCoords);
      }
    } catch (err) {
      console.error("Error fetching property:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (propertyId && isLoaded) fetchProperty();
  }, [propertyId, isLoaded]);

  const toggleToLet = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/properties/${propertyId}/tolet`, {
        method: "PATCH",
      });
      const data = await res.json();
      alert(data.message);
      fetchProperty();
    } catch (err) {
      console.error("Error toggling To-Let:", err);
    }
  };

  if (loading) return <div className="property-container">Loading...</div>;
  if (!property) return <div className="property-container">Property not found.</div>;

  const { propertyType, totalArea, toLet, location = {}, furnishing, floorNumber, balcony, balconyCount, facing } = property;

  return (
    <div className="property-container">
      <h2>Property Details</h2>
      <p><strong>Type:</strong> {propertyType}</p>
      <p><strong>Furnishing:</strong> {furnishing}</p>
      <p><strong>Total Area:</strong> {totalArea}</p>
      <p><strong>Floor Number:</strong> {floorNumber}</p>
      <p><strong>Balcony:</strong> {balcony} {balcony === "Yes" ? `(${balconyCount})` : ""}</p>
      <p><strong>Facing:</strong> {facing}</p>
      <p><strong>To‑Let Status:</strong> {toLet}</p>

      {isOwner && (
        <>
          <button onClick={toggleToLet}>Toggle To‑Let</button>
          <button onClick={() => navigate("/my-property")} style={{ backgroundColor: "#dc3545", marginLeft: "10px" }}>
            Close
          </button>
        </>
      )}
      <button onClick={() => navigate(`/edit-property/${property._id}`)} style={{ marginLeft: "10px" }}>
        Edit Details
      </button>

      <h3>Location</h3>
      <p><strong>City:</strong> {location.city}</p>
      <p><strong>Street:</strong> {location.street}</p>
      <p><strong>Pincode:</strong> {location.pincode}</p>
      <p><strong>State:</strong> {location.state}</p>
      <p><strong>Country:</strong> {location.country}</p>

      {isCustomer && isLoaded && destination && (
        <div className="map-wrapper">
          <h3>📍 Route from your location to property:</h3>
          <Autocomplete
            onLoad={(ref) => setAutocomplete(ref)}
            onPlaceChanged={() => {
              const place = autocomplete?.getPlace();
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
            style={{ marginBottom: "10px", padding: "6px 12px", borderRadius: "4px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}
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
                <>
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
                  <OverlayView position={userLocation} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    <div className="custom-label"><b>You</b></div>
                  </OverlayView>
                </>
              )}

              <Marker
                position={destination}
                icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
                label={{
                  text: "HOUSE",
                  color: "#000",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}
              />
              <OverlayView position={destination} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                <div className="custom-label"><b>Property</b><div className="subtext">Listed by Owner</div></div>
              </OverlayView>

              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </div>
        </div>
      )}

      {isCustomer && !storedCoords && (
        <p style={{ color: "red" }}>📍 Please allow location access on the home page to view directions.</p>
      )}
    </div>
  );
}

export default ViewProperty;
