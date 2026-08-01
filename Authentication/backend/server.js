require("dotenv").config();
const transporter = require("./config/email");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");


const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("🚀 Learning Portal Authentication API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
app.get("/test-email", async (req, res) => {

    try {

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Learning Portal Test",
            text: "Congratulations! Nodemailer is working."
        });

        res.json({
            message: "Email Sent Successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Email Failed",
            error: error.message
        });

    }

});
function showForgot() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("forgotForm").classList.remove("hidden");
}