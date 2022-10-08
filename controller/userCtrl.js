const User = require('../model/user')
const { StatusCodes } = require('http-status-codes')

const userCtrl = {
    getAllUsers: async (req, res) => {
        const users = await User.find({ role: 'user' }).select('-password')
        res.status(StatusCodes.OK).json({ users })
    },
    getSingleUser: async (req, res) => {
        const user = await User.findOne({ _id: req.params.id }).select('-password');
        if (!user)
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User doesn't exists." })
        res.status(StatusCodes.OK).json({ user })
    },
    showCurrentUser: async (req, res) => {
        res.status(StatusCodes.OK).json(req.user)
    }
}

module.exports = userCtrl