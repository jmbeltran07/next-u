const Router = require('express').Router();
const Models = require('./model.js')
const session = require('express-session');

//login
Router.post('/login', function(req, res) {
  Models.Users.findOne({
    email: req.body.user
  }).exec(function(err, doc) {
    if (err) {
      res.status(500)
      res.json(err)
    }else{
      if (doc == null) {
        res.send("El usuario es incorrecto")
      } else {
        if (doc.password == req.body.pass) {
          if (!req.session.userName && !req.session.visitCount) {
            req.session.userName = req.body.user
            req.session.visitCount = 1;
          } else {
            req.session.visitCount += 1;
          }
          res.send("Validado")
        } else {
          res.send("Contraseña Incorrecta")
        }
      }
    }
  })
  /**/

})

//crear usuarios iniciales
Router.get('/creadorDeUsuarios', function(req, res) {
  var Usuario1 = new Models.Users({
    email: "user1@gmail.com",
    name: "usuario 1",
    password: "pass1",
    birthday: "1991-03-08"
  })
  Usuario1.save(function(error) {
    if (error) {
      res.status(500)
      res.json(error)
    }else{
      res.send("usuario guardado")
    }
  })
})

//Obtener todos los usuarios
Router.get('/events/all', function(req, res) {
  Models.Events.find({
    email: req.session.userName
  }).exec(function(err, docs) {
    if (err) {
      res.status(500)
      res.json(err)
    }else{
      var results = []
      for (let i in docs) {
        results.push({
          id: docs[i]._id,
          start: docs[i].start_date,
          end: docs[i].end_date,
          title: docs[i].title,
          allDay: docs[i].allDay,
        })
      }
      res.send(results)
    }
  })
})

// Agregar a un usuario
Router.post('/events/new', function(req, res) {
  var newEvent = new Models.Events({
    title: req.body.title,
    start_date: req.body.start,
    end_date: req.body.end,
    allDay: false,
    email: req.session.userName
  })
  newEvent.save(function(error) {
    if (error) {
      res.status(500)
      res.json(error)
    }else{
      res.send("Evento guardado")
    }
  })
})

// Eliminar un usuario por su id
Router.post('/events/delete/:id', function(req, res) {
  let uid = req.body.id
  console.log(req.body.id)
  Models.Events.remove({
    _id: uid
  }, function(error) {
    if (error) {
      res.status(500)
      res.json(error)
    }else{
      res.send("Registro eliminado")
    }
  })
})

//Actualizar evento
Router.post('/events/update/:id', function(req, res) {
  let uid = req.body.id
  console.log(uid)
  Models.Events.update({
     _id: uid
   }, { $set: { start_date: req.body.start_date, end_date: req.body.end_date }}, (error) => {
    if (error) {
      res.status(500)
      res.json(error)
    }else{
      res.send("Registro actualizado")
    }
  });
})

module.exports = Router
