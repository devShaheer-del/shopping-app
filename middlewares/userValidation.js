const joi = require('joi');

exports.SignupValidation = (req, res, next) => {
    try {
        const Schema = joi.object({
            name: joi.string().min(7).max(15).required(),
            email: joi.string().email().required(),
            password: joi.string().min(5).max(15)
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

exports.LoginValidation = (req, res, next) => {
    try {
        const Schema = joi.object({

            email: joi.string().email().required(),
            password: joi.string().min(5).max(15)
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
