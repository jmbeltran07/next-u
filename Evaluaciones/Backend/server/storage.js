const fs = require('fs'),
  path = require('path'),
  promise = require('es6-promise').Promise

module.exports = {
  getData: (dataType) => {
    //no estoy usando el dataType, pero aqui podria pedir diferentes cosas dependiendo del datatype
    let dataPath = __dirname + path.join('/data.json')
    return new promise(function(resolve, reject) {
      fs.readFile(dataPath, 'utf8', function(err, readData) {
        if (err){
          reject(err)
        }else{
          resolve(JSON.parse(readData))
        }
      })
    })
  },
  saveData: function(datatype, newData, data) {
    var dataPath = dataType == 'users' ? __dirname + path.join('/data/users.json') : __dirname + path.join('/data/messages.json')
    data.current.push(newData)
    return new promise(function(resolve, reject) {
      fs.writeFile(dataPath, JSON.stringify(data), function(err) {
        if (err){
          reject(err)
        }
        resolve('OK')
      })
    })

  }
}
