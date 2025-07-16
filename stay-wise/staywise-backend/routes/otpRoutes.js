import express from "express";
import sendEmail from "../utils/sendEmail.js"; // Ensure .js extension is used

const router = express.Router();

const otpStore = {}; // In-memory store. Use Redis or DB in production.

// POST /api/otp/send
router.post("/send", async (req, res) => {
  const { email, userName } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  otpStore[email] = { otp, expiresAt: Date.now() + 60 * 1000 }; // Expires in 1 min

  try {
    await sendEmail({
      to: email,
      subject: "Your StayWise OTP",
      text: `Dear ${userName},

      Your One-Time Password (OTP) is ${otp}. Please use this code to complete your verification.
      This OTP is valid for 1 minute. Do not share it with anyone.

      Thank you,
      The StayWise Team`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("OTP send failed:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// POST /api/otp/verify
router.post("/verify", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

  const record = otpStore[email];
  if (!record) {
    return res.status(400).json({ message: "No OTP sent to this email" });
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP has expired" });
  }

  if (String(record.otp) !== String(otp)) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[email]; // OTP used → discard it
  res.status(200).json({ success: true, message: "OTP verified successfully" });
});

// ✅ Correct ESM export
export const otpRouter = router;
