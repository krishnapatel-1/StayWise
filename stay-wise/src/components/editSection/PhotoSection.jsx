// editSection/PhotoSection.jsx
import React from "react";

const PhotoSection = ({ formData, setFormData, onNext, onBack }) => {
  const handlePhotoChange = (e, label) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedPhotos = [...(formData.photos || [])];
      const existingIndex = updatedPhotos.findIndex(p => p.label === label);
      const newPhoto = {
        label,
        base64: reader.result,
        name: file.name,
        type: file.type
      };

      if (existingIndex !== -1) {
        updatedPhotos[existingIndex] = newPhoto;
      } else {
        updatedPhotos.push(newPhoto);
      }

      setFormData(prev => ({ ...prev, photos: updatedPhotos }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="section-container">
      <h2>Edit Photos</h2>
      {(formData.photos || []).map((photo, index) => (
        <div key={index}>
          <p>{photo.label}</p>
          {photo.base64 && <img src={photo.base64} alt={photo.label} style={{ width: "200px" }} />}
          <input type="file" onChange={(e) => handlePhotoChange(e, photo.label)} />
        </div>
      ))}

      <div className="navigation-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default PhotoSection;
