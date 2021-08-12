// noinspection JSCheckFunctionSignatures

const express = require('express');
const router = express.Router();
const vaccineController = require('../controller/VaccineController')

router.post('/enroll', vaccineController.enroll)

router.post('/enroll/verify-nid', vaccineController.verifyNid)

router.post('/vaccine-card', vaccineController.getVaccineCard)

router.post('/vaccine-certificate', vaccineController.getVaccineCertificate)

router.post('/vaccine-status', vaccineController.getVaccineStatus)

module.exports = router
