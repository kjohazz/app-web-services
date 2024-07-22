const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true, // El contenido de la plantilla es obligatorio
    },
});

const EmailTemplate = mongoose.model('EmailTemplate', emailTemplateSchema);

module.exports = EmailTemplate;
