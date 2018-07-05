const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Router = require('./server/Router');
Router(app);

const port = 3000;
app.listen(port, () => console.log(`App started on port ${port}`))
