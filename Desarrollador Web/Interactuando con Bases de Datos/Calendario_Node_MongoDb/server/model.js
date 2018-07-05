const mongoose = require('mongoose')

const Schema = mongoose.Schema

var UserSchema = new Schema({
  email: { type: String, required: true, unique: true},
  name: { type: String, required: true },
  password: {type: String, required: true},
  birthday: {type: Date, required: true}
})

var EventSchema = new Schema({
  title: { type: String, required: true },
  start_date: { type: Date, required: true},
  end_date: { type: Date},
  allDay: { type: Boolean, required: true},
  email: { type: String, required: true}
})

let Models = {
  Users: mongoose.model('users', UserSchema),
  Events: mongoose.model('events', EventSchema)
}



module.exports = Models
