const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,

    },
    parent_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',

    }
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;