const express = require('express');
const path = require('path');
const app = express();

// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// App routes
app.use('/fruits', require('./controllers/fruits'));
// app.use('/watches', require('./controllers/watches'));
// app.use('/beers', require('./controllers/beers'));
// app.use('/cars', require('./controllers/cars'));
// app.use('/fish', require('./controllers/fish'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
