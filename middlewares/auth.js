const jwt = require('jsonwebtoken');

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
        req.user = decodeToken;
        next();

    } catch (error) {
        return res.status(403).json({
            message: "Forbidden, Invalid token",
            error: error.message
        });
    }
};
