// Require mongoose
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useFindAndModify: false})
    .then(() => {
        console.log(`Successfully connected to MongoDB Atlas`)
    })
    .catch((error) => {
        console.log(`FAILURE to connect to MongoDB Atlas`);
        console.log(error);
    })

module.exports = mongoose;