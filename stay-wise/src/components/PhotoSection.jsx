import React, { useState, useEffect } from 'react';
import './PhotoSection.css';

const PhotoSection = ({ formData, setFormData, onBack, onNext }) => {
  const [images, setImages] = useState({});
  const [requiredLabels, setRequiredLabels] = useState([]);

  // Convert file to base64 and store in local images state
  const handleImageUpload = (e, label) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImages(prev => ({
        ...prev,
        [label]: {
          name: file.name,
          type: file.type,
          base64: reader.result, // ✅ base64 key
        }
      }));
    };
    reader.readAsDataURL(file); // ✅ convert to base64
  };

  // Sync to global formData.photos
  useEffect(() => {
    setFormData(prev => ({ ...prev, photos: images }));
  }, [images]);

  // Generate required labels based on property type
  useEffect(() => {
    const labels = ['Property Front View'];

    if (formData.propertyType === 'house') {
      const floorDetails = formData.houseFloorDetails || [];
      floorDetails.forEach((floor, index) => {
        for (let i = 1; i <= Number(floor.bedrooms || 0); i++) labels.push(`Floor ${index + 1} - Bedroom ${i}`);
        for (let i = 1; i <= Number(floor.bathrooms || 0); i++) labels.push(`Floor ${index + 1} - Bathroom ${i}`);
        for (let i = 1; i <= Number(floor.kitchens || 0); i++) labels.push(`Floor ${index + 1} - Kitchen ${i}`);
        for (let i = 1; i <= Number(floor.halls || 0); i++) labels.push(`Floor ${index + 1} - Hall ${i}`);
        for (let i = 1; i <= Number(floor.balconies || 0); i++) labels.push(`Floor ${index + 1} - Balcony ${i}`);
      });
    } else {
      const type = formData.propertyType?.toLowerCase();
      switch (type) {
        case 'single room':
          labels.push('Room', 'Bathroom');
          break;
        case 'double room':
          labels.push('Room 1', 'Room 2', 'Bathroom');
          break;
        case '1bhk':
          labels.push('Bedroom', 'Bathroom', 'Kitchen', 'Hall');
          break;
        case '2bhk':
          labels.push('Bedroom 1', 'Bedroom 2', 'Bathroom 1', 'Bathroom 2', 'Kitchen', 'Hall');
          break;
        case '3bhk':
          labels.push('Bedroom 1', 'Bedroom 2', 'Bedroom 3', 'Bathroom 1', 'Bathroom 2', 'Bathroom 3', 'Kitchen', 'Hall');
          break;
        case 'pg room':
        case 'hostel room':
          labels.push('Room', 'Bathroom');
          break;
        default:
          labels.push('Property');
      }

      const balconyCount = parseInt(formData.balconyCount || 0);
      for (let i = 1; i <= balconyCount; i++) {
        labels.push(`Balcony ${i}`);
      }
    }

    setRequiredLabels(labels);
  }, [formData.houseFloorDetails, formData.propertyType, formData.balconyCount]);

  // Render individual image input
  const renderImageInput = (label) => (
    <div key={label} className="photo-upload-field">
      <label>{label}</label>
      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, label)} />
      {images[label]?.base64 && (
        <img src={images[label].base64} alt={label} className="preview-image" />
      )}
    </div>
  );

  const renderHouseFloorPhotos = () => {
    const floorDetails = formData.houseFloorDetails || [];
    const inputs = [renderImageInput("Property Front View")];

    floorDetails.forEach((floor, index) => {
      const fields = [];

      for (let i = 1; i <= Number(floor.bedrooms || 0); i++) fields.push(renderImageInput(`Floor ${index + 1} - Bedroom ${i}`));
      for (let i = 1; i <= Number(floor.bathrooms || 0); i++) fields.push(renderImageInput(`Floor ${index + 1} - Bathroom ${i}`));
      for (let i = 1; i <= Number(floor.kitchens || 0); i++) fields.push(renderImageInput(`Floor ${index + 1} - Kitchen ${i}`));
      for (let i = 1; i <= Number(floor.halls || 0); i++) fields.push(renderImageInput(`Floor ${index + 1} - Hall ${i}`));
      for (let i = 1; i <= Number(floor.balconies || 0); i++) fields.push(renderImageInput(`Floor ${index + 1} - Balcony ${i}`));

      inputs.push(
        <div key={`floor-${index}`} className="floor-photo-section">
          <h3>Floor {index + 1}</h3>
          {fields}
        </div>
      );
    });

    return inputs;
  };

  const renderStandardPropertyPhotos = () => {
    return requiredLabels.map(label => renderImageInput(label));
  };

  const handleNextClick = () => {
    const missing = requiredLabels.filter(label => !images[label]);
    if (missing.length > 0) {
      alert(`Please upload all required photos:\n${missing.join(', ')}`);
      return;
    }

    console.log("✅ Images ready for FinalSection:", images);
    onNext(); // FinalSection will submit everything
  };

  return (
    <div className="photo-section">
      <h2>Photo Upload</h2>
      {formData.propertyType === 'house'
        ? renderHouseFloorPhotos()
        : renderStandardPropertyPhotos()}
      <div className="navigation-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
};

export default PhotoSection;
