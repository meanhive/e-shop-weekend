const jwt = require('jsonwebtoken')

const defaultOptions = {
    expiresIn: '1d'
}

/* payload => user id, it generates auth token for every individual user */
const createJwtToken = ({ payload, options }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { ...defaultOptions, ...options });
    return token;
};


/* logic to verify token */
const isTokenValid = token => jwt.verify(token, process.env.JWT_SECRET);

/* send response with cookies */
const sendResWithCookies = ({ res, statusCode, user, options }) => {
    const token = createJwtToken({ payload: { user }, options });

    const expTime = 1000 * 60 * 60 * 24; // 24 hours = 1day

    // to store token in browser cookies
    res.cookie('refToken', token, {
        httpOnly: true,
        expires: new Date(Date.now() + expTime),
        signed: true
    });

    res.status(statusCode).json({ user, token }); // final token, user info after login
};

module.exports = { createJwtToken, isTokenValid, sendResWithCookies }