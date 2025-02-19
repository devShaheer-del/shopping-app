const joi = require('joi');

exports.ContactValidation = (req, res, next) => {
    try {
        const Schema = joi.object({
            name: joi.string().min(7).max(15).required(),
            email: joi.string().email().required(),
            subject: joi.string().min(10).max(20).required(),
            message: joi.string().min(20).max(30).required()
        });

        const { error } = Schema.validate(req.body, { abortEarly: false }); // Validate all fields

        if (error) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.details.map(err => err.message) // More readable errors
            });
        }

        next(); // Proceed if no errors
    } catch (error) {
        console.error("Validation Middleware Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
