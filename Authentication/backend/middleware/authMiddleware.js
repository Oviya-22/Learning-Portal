const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied. No Token Provided."
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (err) {

        res.status(401).json({
            message: "Invalid or Expired Token"
        });

    }

};
const { findUserByEmail, saveOTP, verifyOTP } = require("../models/userModel");
const verifyOTPController = (req, res) => {

    const { email, otp } = req.body;

    verifyOTP(email, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = results[0];

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (new Date() > new Date(user.otp_expiry)) {
            return res.status(400).json({
                message: "OTP Expired"
            });
        }

        res.json({
            message: "OTP Verified Successfully"
        });

    });

};
exports.verifyOTP = verifyOTPController;
module.exports = authMiddleware;
