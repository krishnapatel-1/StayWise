import React, { useState, useEffect } from 'react';
import './PhotoSection.css';

const PhotoSection = ({ formData, setFormData, onBack, onNext }) => {
  const [images, setImages] = useState({});

  useEffect(() => {
    setFormData(prev => ({ ...prev, photos: images }));
  }, [images]);

  const handleImageUpload = (e, fieldName) => {
    const file = e.target.files[0];
    setImages(prev => ({ ...prev, [fieldName]: file }));
  };

  const renderImageInput = (label) => (
    <div key={label} className="photo-upload-field">
      <label>{label}</label>
      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, label)} />
      {images[label] && (
        <img src={URL.createObjectURL(images[label])} alt={label} className="preview-image" />
      )}
    </div>
  );

  const renderHouseFloorPhotos = () => {
    const floorDetails = formData.houseFloorDetails || [];
    return floorDetails.map((floor, index) => {
      const inputs = [];

      for (let i = 1; i <= Number(floor.bedrooms || 0); i++) {
        inputs.push(renderImageInput(`Floor ${index + 1} - Bedroom ${i}`));
      }

      for (let i = 1; i <= Number(floor.bathrooms || 0); i++) {
        inputs.push(renderImageInput(`Floor ${index + 1} - Bathroom ${i}`));
      }

      for (let i = 1; i <= Number(floor.kitchens || 0); i++) {
        inputs.push(renderImageInput(`Floor ${index + 1} - Kitchen ${i}`));
      }

      for (let i = 1; i <= Number(floor.halls || 0); i++) {
        inputs.push(renderImageInput(`Floor ${index + 1} - Hall ${i}`));
      }

      for (let i = 1; i <= Number(floor.balconies || 0); i++) {
        inputs.push(renderImageInput(`Floor ${index + 1} - Balcony ${i}`));
      }

      return (
        <div key={`floor-${index}`} className="floor-photo-section">
          <h3>Floor {index + 1}</h3>
          {inputs}
        </div>
      );
    });
  };

  const renderStandardPropertyPhotos = () => {
    const type = formData.propertyType?.toLowerCase();
    const fields = [];

    switch (type) {
      case 'single room':
        fields.push('Room', 'Bathroom');
        break;
      case 'double room':
        fields.push('Room 1', 'Room 2', 'Bathroom');
        break;
      case '1bhk':
        fields.push('Bedroom', 'Bathroom', 'Kitchen', 'Hall');
        break;
      case '2bhk':
        fields.push('Bedroom 1', 'Bedroom 2', 'Bathroom 1', 'Bathroom 2', 'Kitchen', 'Hall');
        break;
      case '3bhk':
        fields.push('Bedroom 1', 'Bedroom 2', 'Bedroom 3', 'Bathroom 1', 'Bathroom 2', 'Bathroom 3', 'Kitchen', 'Hall');
        break;
      case 'pg room':
      case 'hostel room':
        fields.push('Room', 'Bathroom');
        break;
      default:
        fields.push('Property');
        break;
    }

    const balconyCount = parseInt(formData.balconyCount || 0);
    for (let i = 1; i <= balconyCount; i++) {
      fields.push(`Balcony ${i}`);
    }

    return fields.map(label => renderImageInput(label));
  };

  return (
    <div className="photo-section">
      <h2>Photo Upload</h2>
      {formData.propertyType === 'house'
        ? renderHouseFloorPhotos()
        : renderStandardPropertyPhotos()}

      <div className="navigation-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default PhotoSection;
