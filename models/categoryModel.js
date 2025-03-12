const mongoose = require('mongoose');



const CategorySchema = {
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }

}


const CategoryModel = mongoose.model('Category', CategorySchema);


module.exports = CategoryModel;