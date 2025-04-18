const mongoose = require('mongoose');
const { default: Products } = require('../../react app/src/components/Products');



const UserSchema = {
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },


}


const UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel;