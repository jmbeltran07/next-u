const Storage = require('./storage.js')

exports.getAll = (req,res) => {
  Storage.getData("hola").then((data) => {
      res.send(data)
    }).catch((error) => {
      res.sendStatus(500).json(error)
    })
  //res.send("hello world")
}
