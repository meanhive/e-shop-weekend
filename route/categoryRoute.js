const route = require('express').Router()
const categoryCtrl = require('../controller/categoryCtrl')
const { authenticateUser, authorizeRoles } = require('../middlewares/authentication')


route.get(`/`, [authenticateUser, authorizeRoles('superadmin')], categoryCtrl.getAll)
route.get(`/:id`, [authenticateUser, authorizeRoles('superadmin')], categoryCtrl.getSingle)
route.post(`/`, [authenticateUser, authorizeRoles('superadmin')], categoryCtrl.create)
route.put(`/:id`, [authenticateUser, authorizeRoles('superadmin')], categoryCtrl.update)
route.delete(`/:id`, [authenticateUser, authorizeRoles('superadmin')], categoryCtrl.delete)

module.exports = route