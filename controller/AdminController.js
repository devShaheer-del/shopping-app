const adminDB = require('../models/Admin');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.CreateAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // ⚡ 1. Validate Required Fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // ⚡ 2. Check if Admin Exists
        const isAdminExist = await adminDB.findOne({ email });
        if (isAdminExist) {
            return res.status(400).json({ success: false, message: "Admin already exists" });
        }

        // ⚡ 3. Hash Password for Security
        const hashPassword = await bcrypt.hash(password, 10);

        // ⚡ 4. Store Admin with Hashed Password + Plain Password (Temporary)
        const newAdmin = await adminDB.create({
            name,
            email,
            password: hashPassword,  // ✅ Hashed Password (for login)
            plainPassword: password, // ⚠️ Store Plain Password (Temporary)
            role
        });

        return res.status(201).json({
            success: true,
            message: "Admin created successfully",
            admin: newAdmin
        });

    } catch (error) {
        console.error("🚨 Error creating admin:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
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


exports.getAdmins = async (req, res) => {
    try {

        const admin = await adminDB.find({});

        if (!admin) {
            res.status(400).json({
                message: "Admin's was not found",
                success: true
            })
        }

        res.status(200).json({
            message: "Admin's found Successfully",
            success: true,
            admin: admin
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}



exports.sendCredentials = async (req, res) => {
    try {
      const { email } = req.body;
  
      // ⚡ 1. Check if admin exists
      const admin = await adminDB.findOne({ email });
      if (!admin) {
        return res.status(404).json({ success: false, message: "Admin not found" });
      }
  
      // ⚡ 2. Use Plain Password (Not Hashed)
      const password = admin.plainPassword;  // ✅ Store & Send Plain Password
  
      // ⚡ 3. Send email with credentials
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.APP_PASS, 
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Admin Credentials",
        text: `Hello ${admin.name},\n\nYour Login Credentials:\nEmail: ${email}\nPassword: ${password}\n\nPlease do not share your credentials with anyone.\n\nRegards,\nAdmin Team`,
      };
  
      await transporter.sendMail(mailOptions);
  
      return res.status(200).json({ success: true, message: "Credentials sent successfully" });
  
    } catch (error) {
      console.error("🚨 Error sending email:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

exports.adminDelete = async (req,res) => {
    try {
        
        const id = req.params.id;

        const DeleteAdmin = await adminDB.findByIdAndDelete(id);

        if(DeleteAdmin){
            return res.status(200).json({
                success : true,
                message : "Admin Deleted Successfully",
                admin : DeleteAdmin
            })
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}