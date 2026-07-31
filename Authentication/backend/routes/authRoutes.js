const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
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
module.exports = router;