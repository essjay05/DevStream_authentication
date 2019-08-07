// Require dotenv
require('dotenv').config();
// Require constants
const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    PORT = process.env.PORT || 3000;

// Connect database

// Middleware

// Routes
    // HOME Route
    app.get('/', (req, res) => {
        res.json({ success: true })
    });
    // API Root Route
    app.get('/api', (req, res) => {
        res.json({ message: `API Root Route`})
    });

// Listening on Port
app.listen(PORT, err => {
    console.log( err || `Server listening on PORT ${PORT}`)
})