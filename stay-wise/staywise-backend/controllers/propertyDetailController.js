import PropertyDetail from "../models/propertyDetails.js";

export const savePropertyDetails = async (req, res) => {
  try {
    const {
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
    } = req.body;

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
    });

    const saved = await newProperty.save();

    res.status(201).json({
      message: "Property details saved successfully",
      propertyId: saved._id,
    });
  } catch (err) {
    console.error("❌ Error saving property details:", err);
    res.status(500).json({ message: "Failed to save property details" });
  }
};
