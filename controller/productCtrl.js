const Product = require('../model/product')
const { StatusCodes } = require('http-status-codes')
const path = require('path')
const cloudinary = require('../util/cloud')
const fs = require('fs')

const removeTempFile = (path) => {
    fs.unlinkSync(path)
}

const productCtrl = {
    create: async (req, res) => {
        let product = await Product.create(req.body)
        res.status(StatusCodes.CREATED).json({ product })
    },
    getAll: async (req, res) => {
        let products = await Product.find({})
        res.status(StatusCodes.OK).json({ products, count: products.length })
    },
    getSingle: async (req, res) => {
        let product = await Product.findOne({ _id: req.params.id }).populate('reviews')
        if (!product)
            return res.status(StatusCodes.NOT_FOUND).json({ msg: `No product found with id ${req.params.id}` })

        return res.status(StatusCodes.OK).json({ product })
    },
    update: async (req, res) => {
        let id = req.params.id

        let product = await Product.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        })

        if (!product)
            return res.status(StatusCodes.NOT_FOUND).json({ msg: `No product found with id ${req.params.id}` })

        res.status(StatusCodes.OK).json({ product })
    },
    delete: async (req, res) => {
        const id = req.params.id

        let product = await Product.findOne({ _id: id })

        if (!product)
            return res.status(StatusCodes.NOT_FOUND).json({ msg: `No product found with id ${req.params.id}` })

        product.remove()
        res.status(StatusCodes.OK).json({ msg: "Product Deleted Successfully" })
    },
    uploadProductImage: async (req, res) => {
        try {
            if (!req.files || Object.keys(req.files).length === 0)
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "No files were selected " })

            const file = req.files.image

            // file size
            if (file.size > 1 * 1024 * 1024) {
                removeTempFile(file.tempFilePath)
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: "File size must be lessthan 1MB" })
            }

            // validate image type => jpg,png
            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                removeTempFile(file.tempFilePath)
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Only allow jpg/png files" })
            }

            // upload logic
            await cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "eshop" }, (err, result) => {
                if (err)
                    return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message })
                removeTempFile(file.tempFilePath)
                return res.status(StatusCodes.OK).json({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            })


        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
        }
    },
    deleteProductImage: async (req, res) => {
        try {
            const { public_id } = req.body

            if (!public_id)
                return res.status(StatusCodes.NOT_FOUND).json({ msg: `No public id = ${public_id} found ` })

            await cloudinary.v2.uploader.destroy(public_id, (err, result) => {
                if (err)
                    return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message })
                res.status(StatusCodes.OK).json({ msg: "Product Image deleted successfully" })
            })
        } catch (err) {
            return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message })
        }
    }
}

module.exports = productCtrl