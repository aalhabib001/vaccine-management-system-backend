const VaccineInfoModel = require('../model/VaccineInfoModel')

const getAllVaccineInfo = (req, res) => {
    let query = {};

    if (req.query.name) {
        query.fullName = {'$regex': req.query.name, '$options': 'i'};
    }

    if (req.query.phoneNo) {
        query.phoneNo = {'$regex': req.query.phoneNo, '$options': 'i'};
    }

    VaccineInfoModel.find(query)
        .then(result => {

            if (result.length === 0) {
                return res.status(404).json({
                    message: "No Data Found",
                    data: result
                })
            } else {
                return res.status(200).json({
                    message: "Data Found",
                    data: result
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

const updateVaccineData = (req, res) => {
    let id = req.params.id;
    let doseId = req.body.doseId
    let vaccineDate = req.body.vaccineDate
    let vaccineName = req.body.vaccineName

    console.log(id)


    VaccineInfoModel.findById(id)
        .then(result => {
            console.log(result)

            if (result) {
                if (doseId === 1) {
                    result.firstDose = vaccineDate;
                    result.firstVac = vaccineName;
                } else if (doseId === 2) {
                    result.secondDose = vaccineDate;
                    result.secondVac = vaccineName;
                    result.isCompleted = true;
                }

                result.save()

                return res.status(200).json({
                    message: "Data Saved"
                })

            } else {
                return res.status(404).json({
                    message: "No Data Found"
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
    getAllVaccineInfo,
    updateVaccineData
}
