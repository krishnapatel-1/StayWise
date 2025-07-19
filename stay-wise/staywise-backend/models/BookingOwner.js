import mongoose from "mongoose";

// Define the schema for the owner's booking record.
// This schema will store a reference to the customer and the property.
const bookingOwnerSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assumes your user model is named 'User'
        required: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assumes your user model is named 'User'
        required: true,
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property', // Assumes your property model is named 'Property'
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    // ✅ CRUCIAL FIX: This option tells Mongoose to use your exact collection name.
    collection: 'bookings_owner'
});

// Create the Mongoose model from the schema.
const BookingOwner = mongoose.model('BookingOwner', bookingOwnerSchema);

export default BookingOwner;
