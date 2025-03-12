const db = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.CreateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required", status: false });
        }

        // Check if user already exists
        const IsUserExist = await db.findOne({ email });
        if (IsUserExist) {
            return res.status(400).json({ message: "User already exists", status: false });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await db.create({
            name,
            email,
            password: hashPassword,
        });

        // Send success response
        return res.status(201).json({
            message: "User was successfully created",
            status: true,
            user, // Optionally include the created user object in the response
        });

    } catch (error) {
        console.error("Error in CreateUser:", error); // Log the error for debugging
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message, // Send only the error message to the client
        });
    }
};


exports.LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const IsUserExistAgain = await db.findOne({ email });
        if (!IsUserExistAgain) {
            return res.status(400).json({ message: "User does not exist", status: false });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, IsUserExistAgain.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password", status: false });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: IsUserExistAgain._id, email: IsUserExistAgain.email },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        );

        // Send success response
        return res.status(200).json({
            message: "Login successful",
            status: true,
            UserName: IsUserExistAgain.name,
            token: token,
        });

    } catch (error) {
        console.error("Error in LoginUser:", error); // Log the error for debugging
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message, // Send only the error message to the client
        });
    }
};



exports.getUser = async (req, res) => {
    try {

        const users = await db.find({});

        res.status(200).json({
            message: "User Get Successfully",
            success: true,
            users: users
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message, // Send only the error message to the client
        });
    }
}