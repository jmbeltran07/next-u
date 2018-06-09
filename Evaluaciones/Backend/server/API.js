const Storage = require('./storage.js')

exports.search = (req,res) => {
  let ciudad = req.query.ciudad
  let tipo = req.query.tipo
  let min = req.query.min
  let max = req.query.max
//  console.log(`ciudad: ${ciudad} tipo: ${tipo} min: ${min} max: ${max} `)
  Storage.getData(ciudad,tipo,min,max).then((data) => {
      res.send(data)
    }).catch((error) => {
      res.sendStatus(500).json(error)
    })
  //res.send("hello world")
}

exports.searchAll = (req,res) => {
  Storage.getAllData().then((data) => {
      res.send(data)
    }).catch((error) => {
      res.sendStatus(500).json(error)
    })
}
