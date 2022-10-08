const { StatusCodes } = require('http-status-codes');
const Category = require('../model/category');

const categoryCtrl = {
    getAll: async (req, res) => {
        try {
            let categories = await Category.find({})
            res.status(StatusCodes.OK).json({ categories, count: categories.length })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getSingle: async (req, res) => {
        try {
            let category = await Category.findOne({ _id: req.params.id })
            if (!category)
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "No category found" })
            res.status(StatusCodes.OK).json({ category })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    create: async (req, res) => {
        try {

            let category = await Category.create(req.body)
            res.status(StatusCodes.CREATED).json({ category })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req, res) => {
        try {
            let category = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            })
            if (!category)
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "No Category Found to do update." })

            res.status(StatusCodes.OK).json({ category })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req, res) => {
        try {
            let id = req.params.id
            await Category.findOneAndDelete({ _id: id })
            res.status(StatusCodes.OK).json({ msg: "Category deleted successfully." })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = categoryCtrl