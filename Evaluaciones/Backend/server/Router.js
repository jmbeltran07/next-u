module.exports = app => {
  const API = require('./API');

  app.route('/getAll')
    .get(API.getAll);
}
