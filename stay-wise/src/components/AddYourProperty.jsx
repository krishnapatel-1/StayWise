import React, { useState } from 'react';
import GeneralSection from './GeneralSection';
import PhotoSection from './PhotoSection';
import UtilitySection from './UtilitySection';
import FacilitiesSection from './FacilitiesSection';
import ServiceSection from './ServiceSection';
import LocationSection from './LocationSection';
import PricingSection from './PricingSection';
import FinalSection from './FinalSection';
import { useNavigate } from 'react-router-dom';
import './AddYourProperty.css';


const AddYourProperty = () => {
  const [formData, setFormData] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const navigate=useNavigate();

  const sections = [
    'general',
    'photos',
    'utilities',
    'facilities',
    'services',   // conditionally rendered
    'location',
    'pricing',
    'final'
  ];

  const handleNext = () => {
    // If property type is not PG or hostel, skip 'services' section
    if (
      sections[currentSection] === 'facilities' &&
      !(formData.propertyType === 'pg room' || formData.propertyType === 'hostel room')
    ) {
      setCurrentSection(currentSection + 2); // skip 'services'
    } else {
      setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    }
  };

  const handleBack = () => {
    // If coming from location to facilities and property is not PG/hostel, skip services
    if(
      sections[currentSection] === 'general'
    ) {
      if (window.confirm("Are you sure you want to go back home? Unsaved data may be lost.")) {
        navigate('/owner');
      }
      return;
    } else if (
      sections[currentSection] === 'location' &&
      !(formData.propertyType === 'pg room' || formData.propertyType === 'hostel room')
    ) {
      setCurrentSection(currentSection - 2);
    } else {
      setCurrentSection((prev) => Math.max(prev - 1, 0));
    }
  
  };

  const renderSection = () => {
    switch (sections[currentSection]) {
      case 'general':
        return (
          <GeneralSection
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'photos':
        return (
          <PhotoSection
            formData={formData}
            setFormData={setFormData}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 'utilities':
        return (
          <UtilitySection
            formData={formData}
            setFormData={setFormData}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 'facilities':
        return (
          <FacilitiesSection
            formData={formData}
            setFormData={setFormData}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 'services':
        if (formData.propertyType === 'pg room' || formData.propertyType === 'hostel room') {
          return (
            <ServiceSection
              formData={formData}
              setFormData={setFormData}
              onBack={handleBack}
              onNext={handleNext}
            />
          );
        } else {
          handleNext(); // auto-skip
        }
        break;
      case 'location':
        return (
          <LocationSection
            formData={formData}
            setFormData={setFormData}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 'pricing':
        return (
          <PricingSection
            formData={formData}
            setFormData={setFormData}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 'final':
        return (
            <FinalSection
            formData={formData}
            onBack={handleBack}
            onSubmit={() => {
                console.log('Submitting form data:', formData);
                alert('✅ Property submitted!');
                setFormData({});
                setCurrentSection(0);
                navigate("/owner");
            }}
            />
        );
      default:
        return null;
    }
  };

  return (
    <div className="add-property-container">
      <h2 className="form-heading">Add Your Property</h2>
      <div className="section-wrapper">{renderSection()}</div>
    </div>
  );
};

export default AddYourProperty;
