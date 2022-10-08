const mongoose = require('mongoose')

const Product = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide product name"],
        trim: true,
        maxlength: [100, "product name cann't be more than 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "provide product price"],
        default: 0
    },
    description: {
        type: String,
        required: [true, "provide product description"],
        maxlength: [1000, "description cann't be more than 1000 characters"]
    },
    image: {
        type: Object,
        required: [true, "provide image properties"]
    },
    category: {
        type: String,
        required: [true, "provide category"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        required: [true, "provide stock inventory"],
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0
    }
}, {
    collection: "products",
    timestamps: true
})

/* virutal schema for review */
Product.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false
})

/* if we delete product- at the same time related reviews should delete */
Product.pre('remove', async function (next) {
    await this.model('Review').deleteMany({ product: this._id })
    next()
})

module.exports = mongoose.model("Product", Product)