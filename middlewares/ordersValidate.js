const joi = require('joi');

exports.OrderValidation = async (req, res, next) => {
    try {
        const Schema = joi.object({
            customer_name: joi.string().min(3).max(30).required(),
            customer_email: joi.string().email().required(),
            customer_address: joi.string().min(10).max(100).required(),
            customer_phone: joi.number().required(),
            customer_card: joi.number().required(),
            customer_expire: joi.string().required(),
            customer_cvv: joi.number().required(),
            cartItems: joi.array().items(
                joi.string().length(24).required()  // MongoDB ObjectId format check
            ).required()
        });

        const { error } = Schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                message: "bad request",
                success: false,
                details: error.details.map(err => err.message)
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong",
            success: false
        });
    }
};
