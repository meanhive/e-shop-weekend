const { StatusCodes } = require('http-status-codes')

const errHandlerMiddleware = (err, req, res, next) => {
    let customErr = {
        // default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, // 500
        msg: err.message || "Something went wrong.. 500 Error, Try Again Later.."
    }

    // no validation
    if (err.name === "ValidationError") {
        customErr.msg = Object.values(err.errors).map(item => item.message).join(',');
        customErr.statusCode = 400;
    }

    // no item found
    if (err.name === "CastError") {
        customErr.msg = `No Item found with id : ${err.value}`;
        customErr.statusCode = 404;
    }

    // duplicate value error
    if (err.code && err.code === 11000) {
        customErr.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field.. Value Already exists.`;
        customErr.statusCode = 400;
    }


    return res.status(customErr.statusCode).json({ msg: customErr.msg })
}

module.exports = errHandlerMiddleware