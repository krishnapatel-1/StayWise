import mongoose from "mongoose";

// Schema for storing photo information
const PhotoSchema = new mongoose.Schema({
  label: String,
  name: String,
  type: String,
  base64: String,
});

// The main schema for property details
const PropertyDetailSchema = new mongoose.Schema({
  // Changed ownerId to owner to maintain consistency with booking logic
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User who owns the property
    required: true
  },
  propertyType: String,
  furnishing: String,
  totalArea: String,
  floorNumber: String,
  balcony: String,
  balconyCount: Number,
  facing: String,

  toLet: { type: String, enum: ["Yes", "No"], default: "Yes" },

  // For house type
  houseFloorDetails: [
    {
      bedrooms: Number,
      bathrooms: Number,
      kitchens: Number,
      halls: Number,
      balconies: Number
    }
  ],

  // For PG/Hostel
  sharingCount: Number,

  // Utilities
  electricity: String,
  waterSupply: String,
  wifi: Boolean,
  ac: Boolean,
  fans: Boolean,
  geyser: Boolean,
  refrigerator: Boolean,
  washingMachine: Boolean,
  powerBackup: Boolean,

  // Facilities
  facilities: {
    parking: String,
    cctv: Boolean,
    guard: Boolean,
    lift: Boolean
  },

  // Services (only for PG/Hostel)
  services: {
    mealsIncluded: String,
    gateOpen: String,
    gateClose: String,
    housekeeping: String,
    laundry: Boolean
  },

  // Location
  location: {
    houseNo: { type: String, default: "Unavailable" },
    street: { type: String, default: "Unavailable" },
    city: { type: String, default: "Unavailable" },
    district: { type: String, default: "Unavailable" },
    state: { type: String, default: "Unavailable" },
    country: { type: String, default: "Unavailable" },
    pincode: { type: String, default: "Unavailable" },
    latitude: { type: mongoose.Schema.Types.Mixed, default: "Unavailable" },
    longitude: { type: mongoose.Schema.Types.Mixed, default: "Unavailable" },
  },

  // Pricing
  dailyRent: String,
  monthlyRent: String,
  securityDeposit: String,
  maintenanceCharges: String,
  negotiable: Boolean,
  pricingNote: String,

  // Photos
  photos: [PhotoSchema],

}, {
  timestamps: true, // Automatically add createdAt and updatedAt
  // Explicitly tell Mongoose which collection to use
  collection: 'propertydetails'
});

// ✅ CRUCIAL FIX:
// This line checks if the model has already been compiled. If it has, it
// uses the existing model. If not, it creates a new one. This prevents
// the 'OverwriteModelError'.
const PropertyDetail = mongoose.models.PropertyDetail || mongoose.model("PropertyDetail", PropertyDetailSchema);

export default PropertyDetail;
