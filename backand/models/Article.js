const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,

    },
    description:{
        type:String,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },
    image:{
        type:String,
    }
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;