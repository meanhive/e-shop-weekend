
const checkPermission = (user, item) => {
    // permission for admin
    if (user.role === "superadmin")
        return true
    // check user id
    if (user.userId === item.user.toString())
        return true
}

module.exports = checkPermission