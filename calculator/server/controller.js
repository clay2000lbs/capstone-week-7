const saves = require('./db.json')
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
    }
}