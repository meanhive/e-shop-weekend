const route = require('express').Router()
const productCtrl = require('../controller/productCtrl')
const { authenticateUser, authorizeRoles } = require('../middlewares/authentication')

/* product routes */
route.post(`/`, [authenticateUser, authorizeRoles('superadmin')], productCtrl.create)

route.get(`/`, productCtrl.getAll)
route.get(`/:id`, productCtrl.getSingle)

route.patch(`/:id`, [authenticateUser, authorizeRoles('superadmin')], productCtrl.update)

route.delete(`/:id`, [authenticateUser, authorizeRoles('superadmin')], productCtrl.delete)

// to upload image and delete image
route.post(`/upload`, [authenticateUser, authorizeRoles('superadmin')], productCtrl.uploadProductImage)
route.post(`/destroy`, [authenticateUser, authorizeRoles('superadmin')], productCtrl.deleteProductImage)

module.exports = route