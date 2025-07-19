import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import BookingOwner from "../models/BookingOwner.js";
import BookingCustomer from "../models/BookingCustomer.js";
import User from "../models/user.js";
import Property from "../models/propertyDetails.js";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const router = express.Router();

async function createBookingAndSendEmails(req, res, model, bookingType) {
    try {
        const { ownerId, customerId, propertyId } = req.body;

        if (!ownerId || !customerId || !propertyId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newBooking = new model({ ownerId, customerId, propertyId });
        const savedBooking = await newBooking.save();

        if (!savedBooking) {
            throw new Error("Database save operation failed.");
        }

        const owner = await User.findById(ownerId);
        const customer = await User.findById(customerId);
        const property = await Property.findById(propertyId);

        if (!owner || !customer || !property) {
            console.error("Could not find owner, customer, or property to send email.");
            return res.status(201).json({ message: `✅ ${bookingType} booking created, but failed to send notification email.` });
        }

        // ✅ --- FULL EMAIL LOGIC RESTORED ---

        // Send confirmation email to the CUSTOMER
        try {
            const customerMailInfo = await transporter.sendMail({
                from: `"StayWise" <${process.env.EMAIL_USER}>`,
                to: customer.email,
                subject: "✔ Booking Confirmed!",
                html: `
                    <h3>Hi ${customer.name},</h3>
                    <p>Your booking for the property "<b>${property.propertyType} at ${property.location.street}</b>" has been successfully confirmed.</p>
                    <p>The property owner, ${owner.name}, has been notified.</p>
                    <p>Thank you for using StayWise!</p>
                `,
            });
            console.log(`✅ Customer email sent successfully. Message ID: ${customerMailInfo.messageId}`);
        } catch (emailError) {
            console.error(`❌ Failed to send email to customer (${customer.email}):`, emailError);
        }

        // Send notification email to the OWNER
        try {
            const ownerMailInfo = await transporter.sendMail({
                from: `"StayWise" <${process.env.EMAIL_USER}>`,
                to: owner.email,
                subject: "🎉 You have a new booking!",
                html: `
                    <h3>Hi ${owner.name},</h3>
                    <p>You have received a new booking for your property "<b>${property.propertyType} at ${property.location.street}</b>".</p>
                    <p>The booking was made by <b>${customer.name}</b> (Email: ${customer.email}).</p>
                    <p>You can view your bookings in your StayWise dashboard.</p>
                `,
            });
            console.log(`✅ Owner email sent successfully. Message ID: ${ownerMailInfo.messageId}`);
        } catch (emailError) {
            console.error(`❌ Failed to send email to owner (${owner.email}):`, emailError);
        }

        res.status(201).json({ message: `✅ ${bookingType} booking created successfully`, booking: savedBooking });

    } catch (error) {
        console.error(`❌ Error creating ${bookingType} booking:`, error);
        res.status(500).json({ message: `Server error: Failed to create ${bookingType} booking`, error: error.message });
    }
}

router.post("/owner", (req, res) => {
    createBookingAndSendEmails(req, res, BookingOwner, 'Owner');
});

router.post("/customer", (req, res) => {
    createBookingAndSendEmails(req, res, BookingCustomer, 'Customer');
});

export default router;
