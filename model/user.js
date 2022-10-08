const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide name"],
        maxlength: 50,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: [true, "please provide email"],
        validate: {
            validator: validator.isEmail,
            message: "Invalid email"
        }
    },
    mobile: {
        type: String,
        required: [true, "please provide mobile number"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "plase provide password"],
        minlength: 6,
        maxlength: 16
    },
    profile_img: {
        type: Object,
        default: {
            url: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
        }
    },
    address: {
        type: Object,
        default: {}
    },
    cart: {
        type: Array,
        default: []
    },
    wishlist: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    role: {
        type: String,
        enum: ['superadmin', 'user', 'associate'],
        default: 'user'
    }
}, {
    collection: "users",
    timestamps: true
})

/* encrypt the password */
UserSchema.pre('save', async function () {
    // res.json({ data: this.model('User')})
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/* compare password with stored password */
UserSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch;
}

module.exports = mongoose.model("User", UserSchema)