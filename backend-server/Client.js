const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    email: String,
    driveLink: String,
    uniqueCode: String,
    date: String,
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
