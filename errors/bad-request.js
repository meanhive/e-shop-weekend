const { StatusCodes } = require('http-status-codes');
const CustomApiErr = require('./custom-err')

class BadRequestErr extends CustomApiErr {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST; // 400
    }
}

module.exports = BadRequestErr