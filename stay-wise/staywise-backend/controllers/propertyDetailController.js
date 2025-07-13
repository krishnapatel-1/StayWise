import PropertyDetail from "../models/PropertyDetails.js";

export const savePropertyDetails = async (req, res) => {
  try {
    if (!req.body.ownerId) {
      return res.status(400).json({ error: 'Bad Request: ownerId missing' });
    }

    let {
      ownerId,
      propertyType,
      furnishing,
      totalArea,
      floorNumber,
      balcony,
      balconyCount,
      facing,
      houseFloorDetails,
      sharingCount,
      electricity,
      waterSupply,
      wifi,
      ac,
      fans,
      geyser,
      refrigerator,
      washingMachine,
      powerBackup,
      facilities,
      services,
      location,
      dailyRent,
      monthlyRent,
      securityDeposit,
      maintenanceCharges,
      negotiable,
      pricingNote,
      photos,
      toLet,
    } = req.body;

    if (typeof ownerId === "string") {
      ownerId = ownerId.replace(/"/g, "");
    }

    const newProperty = new PropertyDetail({
      ownerId,
      propertyType,
      furnishing,
      totalArea,
      floorNumber,
      balcony,
      balconyCount,
      facing,
      houseFloorDetails,
      sharingCount,
      electricity,
      waterSupply,
      wifi,
      ac,
      fans,
      geyser,
      refrigerator,
      washingMachine,
      powerBackup,
      facilities,
      services,
      location,
      dailyRent,
      monthlyRent,
      securityDeposit,
      maintenanceCharges,
      negotiable,
      pricingNote,
      photos,
      toLet,
    });

    const saved = await newProperty.save();

    res.status(201).json({
      message: "✅ Property saved with inline photos",
      propertyId: saved._id,
    });
  } catch (err) {
    console.error("❌ Error saving property:", err);
    res.status(500).json({ message: "Failed to save property", error: err.message });
  }
};


export const getPropertiesByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;

    // 🔧 Use the correct model!
    const properties = await PropertyDetail.find({ ownerId });

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get a single property by ID
export const getPropertyById = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const property = await PropertyDetail.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (err) {
    console.error("Error fetching property:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const allproperties = async (req, res) => {
  try {
    const properties = await PropertyDetail.find({});
    res.status(200).json(properties);
  } catch (error) {
    console.error("🔥 Server error:", error);
    res.status(500).json({ error: "Error fetching properties" });
  }
};

// ✅ Toggle the toLet field
export const toggleToLetStatus = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await PropertyDetail.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Flip the value
    property.toLet = property.toLet === "Yes" ? "No" : "Yes";
    await property.save();

    res.status(200).json({ message: `To-Let status changed to ${property.toLet}`, toLet: property.toLet });
  } catch (err) {
    console.error("Error toggling To-Let:", err);
    res.status(500).json({ message: "Server error" });
  }
};