const route = require('express').Router()
const authCtrl = require('../controller/authCtrl')

route.post(`/register`, authCtrl.register)
route.post(`/login`, authCtrl.login)
route.get(`/logout`, authCtrl.logout)

module.exports = route