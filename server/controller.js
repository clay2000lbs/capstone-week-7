const saves = require('./db.json')
const path = require('path')
let globalId = 1

module.exports = {
    getSaves: (req, res) => res.status(200).send(saves),
    createSave: (req, res) => {
        let {saveValue} = req.body
        let newSave = {
            id: globalId,
            saveValue
        }
        saves.push(newSave)
        res.status(200).send(saves)
        globalId++
    },
    render: (req, res) => res.sendFile(path.join(__dirname, "../index.html"))
}