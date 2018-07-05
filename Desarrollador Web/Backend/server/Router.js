module.exports = app => {
  const API = require('./API');

  app.route('/search')
    .get(API.search);
  app.route('/search/all')
    .get(API.searchAll);
}
