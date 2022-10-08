// error handler

class CustomApiErr extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = CustomApiErr

// base class -> CustomApiErr
// super class -> Error Constructor