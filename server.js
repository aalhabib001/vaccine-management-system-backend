const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config();

const userRoute = require('./api/routes/UserRoutes')
const vaccineRoute = require('./api/routes/VaccineRoutes')
const adminRoutes = require('./api/routes/AdminRoutes')

const app = express()

mongoose.connect(process.env.dbUrl, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
)
    .then(r => console.log("Connection ok"))
    .catch(err => console.log(err));


app.use(express.urlencoded({extended: true}))
app.use(express.json())
// noinspection JSCheckFunctionSignatures
app.use(cors())
// noinspection JSCheckFunctionSignatures
app.use(morgan('dev'))

// app.use('/api', bookRouter)
app.use('/api/users', userRoute)
app.use('/api/vaccine', vaccineRoute)
app.use('/api/admin', adminRoutes)


app.get('/', (req, res) => {

    res.json('Hello World')
})

const PORT = process.env.PORT || 4200
app.listen(PORT, () => {
    console.log('The app is running on ' + PORT)
})

