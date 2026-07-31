const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-otp", authController.verifyOTP);
router.post("/reset-password", authController.resetPassword);
router.get(
    "/profile",
    authMiddleware,
    (req, res) => {

        res.json({

            message: "Welcome to your profile",

            user: req.user

        });

    }
);
router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("Admin"),
    (req, res) => {

        res.json({
            message: "Welcome Admin"
        });

    }
);

router.get(
    "/staff",
    authMiddleware,
    roleMiddleware("Staff", "Admin"),
    (req, res) => {

        res.json({
            message: "Welcome Staff"
        });

    }
);

router.get(
    "/student",
    authMiddleware,
    roleMiddleware("Student", "Staff", "Admin"),
    (req, res) => {

        res.json({
            message: "Welcome Student"
        });

    }
);

module.exports = router;
