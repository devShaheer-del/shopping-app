const adminDB = require('../models/Admin');
const bcrypt = require('bcryptjs');

exports.CreateAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if admin exists
        const IsAdminExist = await adminDB.findOne({ name });
        if (IsAdminExist) {
            return res.status(400).json({
                message: "Admin already exists",
                success: false
            });
        }

        // Hash password
        const hashpassword = await bcrypt.hash(password, 10);

        // Create new admin
        const NewAdmin = await adminDB.create({
            name,
            email,
            password: hashpassword,
            role
        });

        if (NewAdmin) {
            return res.status(201).json({
                message: "Admin created successfully",
                success: true,
                admin: NewAdmin
            });
        }

    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


exports.AdminLogin = async (req, res) => {
    try {
        const { name, password } = req.body;

        // Check if admin exists
        const IsExsist = await adminDB.findOne({ name });

        if (!IsExsist) {
            return res.status(400).json({
                message: "Admin not Exist",
                success: false
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, IsExsist.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid Admin or Password",
                success: false
            });
        }

        // Successful login
        return res.status(200).json({
            message: "Admin Login Successfully",
            success: true,
            Admin: IsExsist.name // You should replace this with a JWT token in production
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};