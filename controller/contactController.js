const db = require('../models/contactModel');

exports.createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            res.status(400).json({ message: "All fields are required", status: false });
        } // ❌ No return statement, so code execution continues

        const newContact = await db.create({ name, email, subject, message });

        res.status(201).json({ message: "Message was sent successfully", status: true, data: newContact });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
