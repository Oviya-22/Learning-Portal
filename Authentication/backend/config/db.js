const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "learning_portal"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database Connection Failed:", err.message);
        return;
    }

    console.log("✅ MySQL Connected Successfully");
});

module.exports = db;