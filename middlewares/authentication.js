const { isTokenValid } = require('../util/jwt')
const { StatusCodes } = require('http-status-codes')

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.refToken || req.header('Authorization');

    if (!token)
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid Token" })

    try {
        const payload = isTokenValid(token);

        req.user = payload.user;

        next();

    } catch (err) {
        return res.status(500).json({ msg: "Invalid Authentication" })
    }
};


const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(StatusCodes.FORBIDDEN).json({ msg: "Unauthorized to access this route" })
        }
        next()
    }
};


module.exports = { authenticateUser, authorizeRoles }