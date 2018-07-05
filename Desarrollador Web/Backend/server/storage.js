const fs = require('fs'),
  path = require('path'),
  promise = require('es6-promise').Promise

module.exports = {
  getData: (ciudad,tipo,min,max) => {
    let dataPath = __dirname + path.join('/data.json')
    return new promise(function(resolve, reject) {
      fs.readFile(dataPath, 'utf8', function(err, readData) {
        if (err){
          reject(err)
        }else{
          var fetchedData = JSON.parse(readData)
          var filteredData = filterData(fetchedData,ciudad,tipo,min,max)
          resolve(filteredData)
        }
      })
    })
  },
  getAllData: () => {
    let dataPath = __dirname + path.join('/data.json')
    return new promise(function(resolve, reject) {
      fs.readFile(dataPath, 'utf8', function(err, readData) {
        if (err){
          reject(err)
        }else{
          var fetchedData = JSON.parse(readData)
          resolve(fetchedData)
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

function filterData(data,ciudad,tipo,min,max){
  var filteredData = [];
  for(let element in data){
    //console.log(data[element]["Ciudad"] + ": " + ciudad)
    //console.log(data[element]["Tipo"] + ": " + tipo)
    var precioConverted = Number(data[element]["Precio"].replace(/[^0-9\.-]+/g,""));
    if((data[element]["Ciudad"] == ciudad || ciudad == "") && (data[element]["Tipo"] == tipo || tipo == "") && (precioConverted >= min) && (precioConverted <= max)){
      filteredData.push(data[element])
    }
  }
  return filteredData;
}
