const CustomApiErr = require('./custom-err')
const UnAuthenticatedErr = require('./un-authenticated')
const UnAuthErr = require('./un-auth')
const BadRequestErr = require('./bad-request')
const NotFoundErr = require('./not-found')

module.exports = {
    CustomApiErr,
    NotFoundErr,
    UnAuthErr,
    UnAuthenticatedErr,
    BadRequestErr
}