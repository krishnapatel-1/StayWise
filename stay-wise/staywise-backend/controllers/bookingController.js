const BookingOwner = require('../models/BookingOwner');
const BookingCustomer = require('../models/BookingCustomer');

exports.createOwnerBooking = async (req, res) => {
    try {
        const { ownerId, customerId, propertyId } = req.body;

        const booking = new BookingOwner({ ownerId, customerId, propertyId });
        await booking.save();

        res.status(201).json({ message: 'Owner booking created successfully', booking });
    } catch (err) {
        console.error('Owner booking error:', err);
        res.status(500).json({ message: 'Server error creating owner booking' });
    }
};

exports.createCustomerBooking = async (req, res) => {
    try {
        const { customerId, ownerId, propertyId } = req.body;

        const booking = new BookingCustomer({ customerId, ownerId, propertyId });
        await booking.save();

        res.status(201).json({ message: 'Customer booking created successfully', booking });
    } catch (err) {
        console.error('Customer booking error:', err);
        res.status(500).json({ message: 'Server error creating customer booking' });
    }
};
export const getPropertiesWithBookingDetails = async (req, res) => {
    try {
        const { ownerId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(ownerId)) {
            return res.status(400).json({ message: 'Invalid Owner ID' });
        }

        const properties = await PropertyDetail.aggregate([
            { $match: { owner: new mongoose.Types.ObjectId(ownerId) } },
            {
                $lookup: {
                    from: 'bookings_owner',
                    localField: '_id',
                    foreignField: 'propertyId',
                    as: 'bookingInfo'
                }
            },
            { $unwind: { path: '$bookingInfo', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'bookingInfo.customerId',
                    foreignField: '_id',
                    as: 'customerDetails'
                }
            },
            { $unwind: { path: '$customerDetails', preserveNullAndEmptyArrays: true } },
            {
                $addFields: {
                    bookedBy: {
                        $cond: {
                            if: { $and: [{ $eq: ["$toLet", "No"] }, { $ifNull: ["$customerDetails", false] }] },
                            then: {
                                name: '$customerDetails.name',
                                email: '$customerDetails.email'
                            },
                            else: null
                        }
                    }
                }
            },
            { $project: { bookingInfo: 0, customerDetails: 0 } }
    ]);

        res.status(200).json(properties);

    } catch (error) {
        console.error("Error fetching properties with booking details:", error);
        res.status(500).json({ message: "Server error while fetching property details" });
    }
};
