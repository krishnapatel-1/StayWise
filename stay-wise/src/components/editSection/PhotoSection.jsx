import React, { useEffect, useState } from "react";

const PhotoSection = ({ formData, setFormData, onNext, onBack }) => {
  const [photoLabels, setPhotoLabels] = useState([]);

  // Generate dynamic labels based on formData
  useEffect(() => {
    const labels = ["Property Front View"];
    const type = formData.propertyType?.toLowerCase();

    if (type === "house") {
      const floors = formData.houseFloorDetails || [];
      floors.forEach((floor, index) => {
        for (let i = 1; i <= +floor.bedrooms || 0; i++) labels.push(`Floor ${index + 1} - Bedroom ${i}`);
        for (let i = 1; i <= +floor.bathrooms || 0; i++) labels.push(`Floor ${index + 1} - Bathroom ${i}`);
        for (let i = 1; i <= +floor.kitchens || 0; i++) labels.push(`Floor ${index + 1} - Kitchen ${i}`);
        for (let i = 1; i <= +floor.halls || 0; i++) labels.push(`Floor ${index + 1} - Hall ${i}`);
        for (let i = 1; i <= +floor.balconies || 0; i++) labels.push(`Floor ${index + 1} - Balcony ${i}`);
      });
    } else {
      switch (type) {
        case "single room":
          labels.push("Room", "Bathroom");
          break;
        case "double room":
          labels.push("Room 1", "Room 2", "Bathroom");
          break;
        case "1bhk":
          labels.push("Bedroom", "Bathroom", "Kitchen", "Hall");
          break;
        case "2bhk":
          labels.push("Bedroom 1", "Bedroom 2", "Bathroom 1", "Bathroom 2", "Kitchen", "Hall");
          break;
        case "3bhk":
          labels.push("Bedroom 1", "Bedroom 2", "Bedroom 3", "Bathroom 1", "Bathroom 2", "Bathroom 3", "Kitchen", "Hall");
          break;
        case "pg room":
        case "hostel room":
          labels.push("Room", "Bathroom");
          break;
        default:
          labels.push("Property");
      }

      const balconyCount = parseInt(formData.balconyCount || 0);
      for (let i = 1; i <= balconyCount; i++) {
        labels.push(`Balcony ${i}`);
      }
    }

    setPhotoLabels(labels);
  }, [formData.propertyType, formData.houseFloorDetails, formData.balconyCount]);

  // Handle photo update
  const handlePhotoChange = (e, label) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newPhoto = {
        label,
        base64: reader.result,
        name: file.name,
        type: file.type,
      };

      const updatedPhotos = [...(formData.photos || [])];
      const existingIndex = updatedPhotos.findIndex(p => p.label === label);
      if (existingIndex !== -1) {
        updatedPhotos[existingIndex] = newPhoto;
      } else {
        updatedPhotos.push(newPhoto);
      }

      setFormData(prev => ({ ...prev, photos: updatedPhotos }));
    };

    reader.readAsDataURL(file);
  };

  // Get existing base64 for label if any
  const getPhotoByLabel = (label) => {
    return (formData.photos || []).find(p => p.label === label);
  };

  return (
    <div className="section-container">
      <h2>Edit Photos</h2>
      {photoLabels.map(label => (
        <div key={label} style={{ marginBottom: "20px" }}>
          <p>{label}</p>
          <input type="file" onChange={(e) => handlePhotoChange(e, label)} />
          {getPhotoByLabel(label)?.base64 && (
            <img
              src={getPhotoByLabel(label).base64}
              alt={label}
              style={{ width: "200px", borderRadius: "8px", marginTop: "10px" }}
            />
          )}
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
