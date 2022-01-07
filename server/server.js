const express = require('express')
const cors = require('cors')
require("dotenv").config()
const app = express()

app.use(express.json())
app.use(cors())

const {
    getSaves,
    createSave,
    render
} = require(`./controller`)

app.get("/styles", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stylesheets"));
});

app.get("/js", (req, res) => {
    res.sendFile(path.join(__dirname, "public/js"));
});

app.use(express.static("public"));

app.get("/", render)
app.get(`/api/calcSaves`, getSaves)
app.post(`./api.calcSaves`, createSave)

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`running on ${PORT}`))