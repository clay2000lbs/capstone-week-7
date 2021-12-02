const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {
getSaves,
createSave
} = require(`./controller`)

app.get(`/api/calcSaves`, getSaves)
app.post(`./api.calcSaves`, createSave)

app.listen(4004, () => console.log(`running on 4004`))