const Review = require('../model/review')
const Product = require('../model/product')
const { StatusCodes } = require('http-status-codes')
const checkPermission = require('../util/checkPermission')

const reviewCtrl = {
    createReview: async (req, res) => {
        try {
            const { product: productId } = req.body

            const isValidProduct = await Product.findOne({ _id: productId })
            if (!isValidProduct)
                return res.status(StatusCodes.NOT_FOUND).json({ msg: `No product found with id = ${productId}` })

            // check the review exists or not
            const alreadySubmitted = await Review.findOne({
                product: productId,
                user: req.user.userId
            })
            if (alreadySubmitted)
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Already submitted review for this product" })

            // add new review
            req.body.user = req.user.userId
            const review = await Review.create(req.body)
            res.status(StatusCodes.OK).json({ review })

        } catch (err) {
            return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message })
        }
    },
    getAllReview: async (req, res) => {
        try {
            const reviews = await Review.find({}).populate({
                path: 'product',
                select: 'name price'
            })
            res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
        } catch (err) {
            return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message })
        }
    },
    getReview: async (req, res) => {
        try {
            let id = req.params.id
            let review = Review.findOne({ _id: id })
            if (!review)
                return res.status(StatusCodes.NOT_FOUND).json({ msg: `No review with id = ${id}` })

            res.status(StatusCodes.OK).json({ review })
        } catch (err) {
            return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message })
        }
    },
    updateReview: async (req, res) => {
        try {
            let id = req.params.id
            const review = await Review.findOne({ _id: id })
            if (!review)
                return res.status(StatusCodes.NOT_FOUND).json({ msg: `No review with id=${id}` })

            const isAllowedAccess = checkPermission(req.user, review)
            if (!isAllowedAccess)
                return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Not Authorized to update this review" })

            const updatedReview = await Review.findOneAndUpdate({ _id: id }, req.body, {
                new: true,
                runValidators: true
            })
            res.status(StatusCodes.OK).json({ review: updatedReview })
        } catch (err) {
            return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message })
        }
    },
    deleteReview: async (req, res) => {
        try {
            const id = req.params.id

            const review = await Review.findOne({ _id: id })
            if (!review)
                return res.status(StatusCodes.NOT_FOUND).json({ msg: `No review with id=${id}` })

            const isAllowedAccess = checkPermission(req.user, review)
            if (!isAllowedAccess)
                return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Not Authorized to delete this review" })

            review.remove()
            res.status(StatusCodes.OK).json({ msg: "review deleted successfully" })
        } catch (err) {
            return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message })
        }
    },
}

module.exports = reviewCtrl