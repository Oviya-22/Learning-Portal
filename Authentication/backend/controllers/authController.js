const bcrypt = require("bcrypt");
const User = require("../models/userModel");

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