import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
  label: String,
  name: String,
  type: String,
  base64: String, // ✅ added
});


const PropertyDetailSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true
  },
  propertyType: String,
  furnishing: String,
  totalArea: String,
  floorNumber: String,
  balcony: String,
  balconyCount: Number,
  facing: String,

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
  photos: [PhotoSchema], // ⬅️ Array of { label, fileId }

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PropertyDetail = mongoose.model("PropertyDetail", PropertyDetailSchema);

export default PropertyDetail;
