// noinspection JSCheckFunctionSignatures

const express = require('express');
const router = express.Router();
const adminController = require('../controller/AdminController')

router.get('/vaccine-infos', adminController.getAllVaccineInfo)

router.put('/vaccine-infos/:id', adminController.updateVaccineData)
//
// router.get('/',userController.getUser)

module.exports = router
