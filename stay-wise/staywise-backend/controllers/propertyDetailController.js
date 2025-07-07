import PropertyDetail from "../models/propertyDetails.js";

export const savePropertyDetails = async (req, res) => {
  try {

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized: No user found' });
    }

    const prop={
      ownerId: req.user.id,
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
      photos, // ← base64 array
    } = req.body;

    const newProperty = new PropertyDetail({
      ownerId: req.user._id,
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
    });

    // console.log("📎 Photos received:", photos);

    const saved = await newProperty.save();

    res.status(201).json({
      message: "✅ Property saved with inline photos",
      propertyId: saved._id,
    });
  } catch (err) {
    console.error("❌ Error saving property:", err);
    res.status(500).json({ message: "Failed to save property" });
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
