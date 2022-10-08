const { StatusCodes } = require('http-status-codes')
const CustomApiErr = require('./custom-err')

class NotFoundErr extends CustomApiErr {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND // 404
    }
}

module.exports = NotFoundErr