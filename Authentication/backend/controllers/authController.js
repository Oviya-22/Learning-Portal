const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const transporter = require("../config/email");

const {
    findUserByEmail,
    saveOTP,
    verifyOTP,
    updatePassword
} = require("../models/userModel");
exports.register = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        User.createUser(
            {
                name,
                email,
                password: hashedPassword,
                role: role || "Student"
            },

            (err) => {

                if (err) {

                    return res.status(500).json({
                        message: "User already exists or database error"
                    });

                }

                res.status(201).json({
                    message: "Registration Successful"
                });

            }

        );

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const jwt = require("jsonwebtoken");
const forgotPassword = (req, res) => {

    const { email } = req.body;

    findUserByEmail(email, (err, results) => {

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

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 5 * 60 * 1000);

        console.log("Generated OTP:", otp);
        console.log("Generated Expiry:", expiry);

        saveOTP(email, otp, expiry, async (err, result) => {

            console.log("SaveOTP Error:", err);
            console.log("SaveOTP Result:", result);

            if (err) {
                return res.status(500).json({
                    message: "Could not save OTP"
                });
            }

            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: "Password Reset OTP",
                    text: `Your OTP is ${otp}. It is valid for 5 minutes.`
                });

                res.json({
                    message: "OTP sent successfully"
                });

            } catch (mailError) {
                return res.status(500).json({
                    message: "Email sending failed",
                    error: mailError.message
                });
            }

        });

    });

};

exports.forgotPassword = forgotPassword;
exports.login = (req, res) => {

    const { email, password } = req.body;

    User.findUserByEmail(email, async (err, result) => {

        if (err)
            return res.status(500).json({ message: err.message });

        if (result.length === 0)
            return res.status(404).json({
                message: "User not found"
            });

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(401).json({
                message: "Invalid Password"
            });

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login Successful",
            token,
            role: user.role
        });

    });

};
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
exports.resetPassword = async (req, res) => {

    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({
            message: "Email and new password are required"
        });
    }

    try {

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        updatePassword(email, hashedPassword, (err) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            res.json({
                message: "Password Reset Successful"
            });

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};