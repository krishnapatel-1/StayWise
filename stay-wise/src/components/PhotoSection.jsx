import React, { useState, useEffect } from 'react';
import './PhotoSection.css';

const PhotoSection = ({ formData, setFormData, onBack, onNext }) => {
  const [images, setImages] = useState({});
  const [requiredLabels, setRequiredLabels] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setFormData(prev => ({ ...prev, photos: images }));
  }, [images]);

  const handleImageUpload = (e, fieldName) => {
    const file = e.target.files[0];
    setImages(prev => ({ ...prev, [fieldName]: file }));
  };

  useEffect(() => {
  if (formData.propertyType === 'house') {
    const floorDetails = formData.houseFloorDetails || [];
    const labels = [];

    floorDetails.forEach((floor, index) => {
      for (let i = 1; i <= Number(floor.bedrooms || 0); i++) {
        labels.push(`Floor ${index + 1} - Bedroom ${i}`);
      }
      for (let i = 1; i <= Number(floor.bathrooms || 0); i++) {
        labels.push(`Floor ${index + 1} - Bathroom ${i}`);
      }
      for (let i = 1; i <= Number(floor.kitchens || 0); i++) {
        labels.push(`Floor ${index + 1} - Kitchen ${i}`);
      }
      for (let i = 1; i <= Number(floor.halls || 0); i++) {
        labels.push(`Floor ${index + 1} - Hall ${i}`);
      }
      for (let i = 1; i <= Number(floor.balconies || 0); i++) {
        labels.push(`Floor ${index + 1} - Balcony ${i}`);
      }
    });

    setRequiredLabels(labels);
  }
}, [formData.houseFloorDetails, formData.propertyType]);

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
    const labels = [];

    const inputs = floorDetails.map((floor, index) => {
      const fields = [];

      for (let i = 1; i <= Number(floor.bedrooms || 0); i++) {
        const label = `Floor ${index + 1} - Bedroom ${i}`;
        fields.push(renderImageInput(label));
        labels.push(label);
      }

      for (let i = 1; i <= Number(floor.bathrooms || 0); i++) {
        const label = `Floor ${index + 1} - Bathroom ${i}`;
        fields.push(renderImageInput(label));
        labels.push(label);
      }

      for (let i = 1; i <= Number(floor.kitchens || 0); i++) {
        const label = `Floor ${index + 1} - Kitchen ${i}`;
        fields.push(renderImageInput(label));
        labels.push(label);
      }

      for (let i = 1; i <= Number(floor.halls || 0); i++) {
        const label = `Floor ${index + 1} - Hall ${i}`;
        fields.push(renderImageInput(label));
        labels.push(label);
      }

      for (let i = 1; i <= Number(floor.balconies || 0); i++) {
        const label = `Floor ${index + 1} - Balcony ${i}`;
        fields.push(renderImageInput(label));
        labels.push(label);
      }

      return (
        <div key={`floor-${index}`} className="floor-photo-section">
          <h3>Floor {index + 1}</h3>
          {fields}
        </div>
      );
    });

    //setRequiredLabels(labels);
    return inputs;
  };

    useEffect(() => {
    if (formData.propertyType !== 'house') {
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

      setRequiredLabels(fields);
    }
  }, [formData.propertyType, formData.balconyCount]);

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

    //setRequiredLabels(fields);
    return fields.map(label => renderImageInput(label));
  };

  const handleNextClick = async () => {
    const missing = requiredLabels.filter(label => !images[label]);
    if (missing.length > 0) {
      alert(`Please upload all required photos:\n${missing.join(', ')}`);
      return;
    }

    setUploading(true);
    const uploadedPhotoIds = {};
    const ownerId = localStorage.getItem("ownerId");

    for (const [label, file] of Object.entries(images)) {
      const photoForm = new FormData();
      photoForm.append("file", file);
      photoForm.append("ownerId", ownerId);
      photoForm.append("label", label);

      try {
        const res = await fetch("http://localhost:5000/api/photos/upload", {
          method: "POST",
          body: photoForm,
        });

        const data = await res.json();

        if (res.ok) {
          uploadedPhotoIds[label] = data.fileId;
        } else {
          console.error("Upload error:", data.message);
        }
      } catch (error) {
        console.error("Error uploading photo:", label, error);
      }
    }

    setFormData(prev => ({
      ...prev,
      photos: uploadedPhotoIds,
    }));

    setUploading(false);
    onNext();
  };

  return (
    <div className="photo-section">
      <h2>Photo Upload</h2>

      {formData.propertyType === 'house'
        ? renderHouseFloorPhotos()
        : renderStandardPropertyPhotos()}

      <div className="navigation-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={handleNextClick} disabled={uploading}>
          {uploading ? "Uploading..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default PhotoSection;
