const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel'); // 👈 User model import karo

exports.AuthProducts = async (req, res, next) => {
    try {
        const auth = req.headers['authorization'];

        if (!auth || !auth.startsWith('Bearer ')) {
            return res.status(401).json({
                message: "Unauthorized, JWT is required"
            });
        }

        const token = auth.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized, Token not provided"
            });
        }

        const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

        // 👇 Yahaan database se user find karo
        const user = await UserModel.findById(decodeToken.id).select('-password'); // password hide kar diya

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized, User not found"
            });
        }

        req.user = user;  // 👈 Ab pura user object aa gaya
        next();

    } catch (error) {
        return res.status(403).json({
            message: "Forbidden, Invalid token",
            error: error.message
        });
    }
};
