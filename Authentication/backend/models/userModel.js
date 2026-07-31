const db = require("../config/db");

const createUser = (user, callback) => {
    const sql = `
        INSERT INTO users(name, email, password, role)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [user.name, user.email, user.password, user.role], callback);
};

const findUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
};

const saveOTP = (email, otp, expiry, callback) => {
    const sql = `
        UPDATE users
        SET otp = ?, otp_expiry = ?
        WHERE email = ?
    `;

    db.query(sql, [otp, expiry, email], callback);
};

const verifyOTP = (email, callback) => {
    const sql = `
        SELECT otp, otp_expiry
        FROM users
        WHERE email = ?
    `;

    db.query(sql, [email], callback);
};
const updatePassword = (email, password, callback) => {

    const sql = `
        UPDATE users
        SET password = ?, otp = NULL, otp_expiry = NULL
        WHERE email = ?
    `;

    db.query(sql, [password, email], callback);

};
module.exports = {
    createUser,
    findUserByEmail,
    saveOTP,
    verifyOTP,
    updatePassword
};