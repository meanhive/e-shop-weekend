const User = require('../model/user')
const { StatusCodes } = require('http-status-codes')
const { sendResWithCookies } = require('../util/jwt')
const sendEmail = require('../middlewares/sendEmail')

const authCtrl = {
    register: async (req, res) => {
        const { name, email, mobile, password } = req.body;

        const emailAlreadyExists = await User.findOne({ email })
        if (emailAlreadyExists) {
            // throw new CustomErr.BadRequestErr('Email already exists.')
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Email already exists." })
        }

        const mobileAlreadyExists = await User.findOne({ mobile })
        if (mobileAlreadyExists) {
            // throw new CustomErr.BadRequestErr('Mobile number already exists.')
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Mobile number already exists." })
        }

        await User.create({ name, email, mobile, password })

        const regTemplate = `<div>
                    <h1> User Registration </h1>
                    <h4>Hi, ${name}.. Thank you for registering with us </h4>
                    <p>Happy Shopping..</p>
            </div>`

        sendEmail(email, "User registration", regTemplate)

        return res.json({ msg: "User Registered Successfully" })
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        const extUser = await User.findOne({ email });
        if (!extUser)
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User doesn't exist." })

        const isPasswordCorrect = await extUser.comparePassword(password);
        if (!isPasswordCorrect)
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Incorrect Password" });

        sendResWithCookies({
            res,
            statusCode: StatusCodes.OK,
            user: { name: extUser.name, userId: extUser._id, role: extUser.role }
        })
    },
    logout: async (req, res) => {
        res.cookie('refToken', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });
        return res.status(StatusCodes.OK).json({ msg: "user logged out" })
    }
};

module.exports = authCtrl