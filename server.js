require('dotenv').config() // env
require('express-async-errors')

// packages
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser')
const rateLimiter = require('express-rate-limit')
const fileUpload = require('express-fileupload')
const path = require('path');

const { StatusCodes } = require('http-status-codes')

// routes
const authRoute = require('./route/authRoute')
const userRoute = require('./route/userRoute')
const categoryRoute = require('./route/categoryRoute')
const productRoute = require('./route/productRoute')
const reviewRoute = require('./route/reviewRoute')

const PORT = process.env.PORT || 5200;

// middlewares
const notFoundMiddleware = require('./middlewares/not-found')
const errHandlerMiddleware = require('./middlewares/error-handler')

const connectDB = require('./db/connect')

const app = express();

// body parsers
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors()) // to avoid cross origin resource sharing
//security packages

app.use(xss())
app.use(rateLimiter({ windowMs: 60 * 1000, max: 150 }))

app.use(cookieParser(process.env.COOKIE_SECRET)) // signed cookies
app.use(morgan('tiny'))
app.use(fileUpload({
    useTempFiles: true
}))


app.use(errHandlerMiddleware)

// api service routes
app.use(`/api/v1/auth`, authRoute)
app.use(`/api/v1/users`, userRoute)
app.use(`/api/v1/category`, categoryRoute)
app.use(`/api/v1/product`, productRoute)
app.use(`/api/v1/review`, reviewRoute)

app.all(`/*`, notFoundMiddleware) // default route

/* production build settings */
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    app.use(express.static(`client/build`))
    app.get(`*`, (req, res) => {
        res.sendFile(path.join(__dirname + `/client/build/index.html`))
    });
}

const start = async () => {
    try {
        await connectDB()
        app.listen(PORT, console.log(`server is running @ http://localhost:${PORT}`))
    } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message })
    }
}

start()