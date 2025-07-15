import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GeneralSection from "./editSection/GenralSection";
import PhotoSection from "./editSection/PhotoSection";
import UtilitySection from "./editSection/UtilitySection";
import FacilitiesSection from "./editSection/FacilitySection";
import ServicesSection from "./editSection/ServiceSection";
import LocationSection from "./editSection/LocationSection";
import PricingSection from "./editSection/PricingSection";
import FinalEditSection from "./editSection/FinalEditSection";

function EditProperty() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/properties/${propertyId}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            ...data,
            propertyType: data.propertyType?.toLowerCase() || "",
          });
        } else {
          alert("Failed to load property data.");
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        alert("Something went wrong.");
      }
    };
    fetchProperty();
  }, [propertyId]);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleFinalSubmit = async (updatedData) => {
    try {
      const res = await fetch(`http://localhost:4000/api/properties/${propertyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Property updated successfully");
        navigate("/my-property");
      } else {
        alert(data.message || "Update failed.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong.");
    }
  };

  if (!formData) return <p>Loading...</p>;

  const isPGorHostel = formData.propertyType === "pg room" || formData.propertyType === "hostel room";

  const steps = [
    <GeneralSection
      formData={formData}
      setFormData={setFormData}
      onNext={handleNext}
      key="general"
    />,
    <PhotoSection
      formData={formData}
      setFormData={setFormData}
      onNext={handleNext}
      onBack={handleBack}
      key="photos"
    />,
    <UtilitySection
      formData={formData}
      setFormData={setFormData}
      onNext={handleNext}
      onBack={handleBack}
      key="utilities"
    />,
    <FacilitiesSection
      formData={formData}
      setFormData={setFormData}
      onNext={handleNext}
      onBack={handleBack}
      key="facilities"
    />,
    ...(isPGorHostel ? [
      <ServicesSection
        formData={formData}
        setFormData={setFormData}
        onNext={handleNext}
        onBack={handleBack}
        key="services"
      />
    ] : []),
    <LocationSection
      formData={formData}
      setFormData={setFormData}
      onNext={handleNext}
      onBack={handleBack}
      key="location"
    />,
    <PricingSection
      formData={formData}
      setFormData={setFormData}
      onNext={handleNext}
      onBack={handleBack}
      key="pricing"
    />,
    <FinalEditSection
      formData={formData}
      onBack={handleBack}
      onSubmit={handleFinalSubmit}
      key="final"
    />,
  ];

  return (
    <div className="edit-property-container">
      {steps[currentStep]}
    </div>
  );
}

export default EditProperty;
