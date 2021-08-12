const VaccineInfoModel = require('../model/VaccineInfoModel')

const enroll = async (req, res) => {

    if (req.body.otp !== "123456") {
        return res.status(400).json({
            message: "Otp Not Matched"
        })
    }

    await validateNidInDb(res, req.body.nid);

    let vaccineReg = new VaccineInfoModel({
        nid: req.body.nid,
        phoneNo: req.body.phoneNo,
        fullName: req.body.fullName,
        vaccineCenter: req.body.vaccineCenter,
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
        firstDose: null,
        secondDose: null,
        firstVac: null,
        secondVac: null,
        isCompleted: false
    })

    vaccineReg.save()
        .then(result => {
            return res.status(200).json({
                message: "Registration Completed"
            })
        })
        .catch(error => {
            return res.status(400).json({
                error
            })
        })
}

const verifyNid = async (req, res) => {
    await validateNidInDb(res, req.query.nid);
    console.log(req.query.nid)

    return res.status(200).json({
        message: "NID is Available for Register"
    })

}


const validateNidInDb = async (res, nid) => {
    const isExists = await VaccineInfoModel.exists({nid: nid});

    if (isExists) {
        return res.status(400).json({
            message: "NID Already Exists"
        })
    }
}

const getVaccineCard = async (req, res) => {
    let nid = req.body.nid;
    let phoneNo = req.body.phoneNo

    VaccineInfoModel.findOne({nid, phoneNo})
        .then(result => {
            if (result == null) {
                return res.status(404).json({
                    message: "No Vaccine Data Found"
                })
            } else if (result.isCompleted) {
                return res.status(400).json({
                    message: "Your Vaccination is Complete. Please Download Vaccine Certificate"
                })
            } else {
                return res.status(200).json({
                    message: 'Data Found',
                    vaccineInfo: {
                        nid: result.nid,
                        phoneNo: result.phoneNo,
                        fullName: result.fullName,
                        vaccineCenter: result.vaccineCenter,
                        dateOfBirth: result.dateOfBirth,
                        address: result.address
                    }
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({
                error
            })
        })


}

const getVaccineCertificate = (req, res) => {
    let nid = req.body.nid;
    let phoneNo = req.body.phoneNo

    VaccineInfoModel.findOne({nid, phoneNo})
        .then(result => {
            if (result == null) {
                return res.status(404).json({
                    message: "No Vaccine Data Found"
                })
            } else if (!result.isCompleted) {
                return res.status(400).json({
                    message: "Your Vaccination is Not Completed."
                })
            } else {
                return res.status(200).json({
                    message: 'Data Found',
                    vaccineInfo: result
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({
                error
            })
        })


}

const getVaccineStatus = (req, res) => {
    let nid = req.body.nid;
    let phoneNo = req.body.phoneNo

    VaccineInfoModel.findOne({nid, phoneNo})
        .then(result => {
            if (result == null) {
                return res.status(404).json({
                    message: "You are not Registered"
                })
            } else {
                return res.status(200).json({
                    message: 'You are Registered'
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({
                error
            })
        })
}

module.exports = {
    enroll,
    verifyNid,
    getVaccineCard,
    getVaccineCertificate,
    getVaccineStatus
}
