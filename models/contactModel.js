const mongoose = require('mongoose');



const ContactSchema = {
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },

}


const ContactModel = mongoose.model('Contact',ContactSchema);


module.exports = ContactModel;