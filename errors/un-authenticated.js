const { StatusCodes } = require('http-status-codes')
const CustomApiErr = require('./custom-err')

class UnAuthenticatedErr extends CustomApiErr {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnAuthenticatedErr