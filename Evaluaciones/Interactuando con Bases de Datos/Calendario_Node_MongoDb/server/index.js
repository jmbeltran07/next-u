const http = require('http'),
      path = require('path'),
      Routing = require('./rutas.js'),
      express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      session = require('express-session');

const PORT = 8082
const app = express()

const Server = http.createServer(app)

mongoose.connect('mongodb://localhost/calendarproject')


app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(session({
  secret: 'SecretString'
}))
app.use('/', Routing)

Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})
