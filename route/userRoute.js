const route = require('express').Router()
const userCtrl = require('../controller/userCtrl')
const { authenticateUser, authorizeRoles } = require('../middlewares/authentication')

route.get(`/`, [authenticateUser, authorizeRoles('superadmin') ], userCtrl.getAllUsers)
route.get(`/currentUser`, [authenticateUser], userCtrl.showCurrentUser)
route.get(`/:id`, [authenticateUser], userCtrl.getSingleUser)

module.exports = route