// Make sure to import your PropertyDetail model at the top of the file
import PropertyDetail from '../models/propertyDetails.js';

// --- Implemented Functions ---

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


export const toggleToLetStatus = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const property = await PropertyDetail.findById(propertyId);

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        // Determine the new status
        const newStatus = property.toLet === "Yes" ? "No" : "Yes";

        // Use findByIdAndUpdate to set only the 'toLet' field,
        // which avoids the validation error on other missing fields.
        const updatedProperty = await PropertyDetail.findByIdAndUpdate(
            propertyId,
            { $set: { toLet: newStatus } },
            { new: true }
        );

        res.status(200).json({ message: "Property status toggled successfully", property: updatedProperty });

    } catch (error) {
        console.error("Error toggling To-Let status:", error);
        res.status(500).json({ message: "Server error while toggling status" });
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


export const updatePropertyById = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const updates = req.body;

        const updated = await PropertyDetail.findByIdAndUpdate(propertyId, updates, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json({ message: "Property updated successfully", property: updated });
    } catch (err) {
        console.error("Error updating property:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


// --- Other Controller Functions ---

export const savePropertyDetails = async (req, res) => {
    try {
        const { owner, ...propertyData } = req.body;
        if (!owner) {
            return res.status(400).json({ message: "Owner ID is required." });
        }
        const newProperty = new PropertyDetail({ owner, ...propertyData });
        await newProperty.save();
        res.status(201).json({ message: "Property saved successfully!", property: newProperty });
    } catch (error) {
        console.error("Error saving property details:", error);
        res.status(500).json({ message: "Server error while saving property" });
    }
};

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

export const updatePropertyStatus = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const { toLet } = req.body;
        if (typeof toLet === 'undefined') {
            return res.status(400).json({ message: 'Missing "toLet" field in request body' });
        }
        const updatedProperty = await PropertyDetail.findByIdAndUpdate(
            propertyId,
            { $set: { toLet: toLet } },
            { new: true }
        );
        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json({
            message: 'Property status updated successfully',
            property: updatedProperty
        });
    } catch (error) {
        console.error("Error updating property status:", error);
        res.status(500).json({ message: 'Server error while updating property status' });
    }
};
