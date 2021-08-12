const mongoose = require('mongoose')
const {Schema} = require("mongoose");

const vaccineInfoSchema = new Schema({
    nid: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    phoneNo: {
        type: String,
        trim: true,
        required: true
    },
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    vaccineCenter: {
        type: String,
        trim: true,
        required: true
    },
    dateOfBirth: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    firstDose: {
        type: String,
        trim: true,
        required: false
    },
    secondDose: {
        type: String,
        trim: true,
        required: false
    },
    firstVac: {
        type: String,
        trim: true,
        required: false
    },
    secondVac: {
        type: String,
        trim: true,
        required: false
    },
    isCompleted: {
        type: Boolean,
        trim: true,
        required: true
    },

})

const VaccineInfoModel = mongoose.model('VaccineInfoModel', vaccineInfoSchema)

module.exports = VaccineInfoModel
