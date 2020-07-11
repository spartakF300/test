const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');
const upload = require('../multer').uploads;


router.get('/article', async (req, res) => {
    try {
        const data = await Article.find();

        res.send(data)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const articleData = req.body;

    try {
        let article = {
            title: articleData.title,
            description: articleData.description,
            user: req.user._id,
            category: articleData.category
        };

        if (req.file) {
            article.image = req.file.filename;
        }

        const newArticle = new Article(article);

        await newArticle.save();

        return res.send(newArticle)

    } catch (e) {
        return res.status(500).send(e)
    }
});
router.get('/', auth, async (req, res) => {
    let params = {};

    if (req.query.id) {
        params.category = req.query.id
    }
    try {
        const article = await Article.find(params).populate(['user', 'category']);
        if (!article) {
            return res.status(404).send({message: 'Article not a found!!!'})
        }
        return res.send(article)
    } catch (e) {
        return res.status(500).send(e)
    }
});
router.get('/:id', auth, async (req, res) => {

    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).send({message: 'Article not a found!!!'})
        }
        return res.send(article)
    } catch (e) {
        return res.status(500).send(e)
    }
});

router.put('/:id',[auth, upload.single('image')], async (req, res) => {
   const articleData = req.body;
   const user = req.user;

   const editArticle = await Article.findById(req.params.id);

   if(!editArticle){
       return res.status(404).send({message: 'Article not a found!!!'})
   }
   if(editArticle.user.toString() !== user._id.toString()){
       return res.status(403).send({message: 'You are not authorized to edit this article!!!'})
   }

   editArticle.title= articleData.title;
   editArticle.description= articleData.description;
   editArticle.category= articleData.category;

    if (req.file) {
        editArticle.image = req.file.filename;
    }
   await editArticle.save();
    return res.send(editArticle)
});
router.delete('/:id',auth, async (req, res) => {

    const user = req.user;

    const deleteArticle = await Article.findById(req.params.id);

    if(!deleteArticle){
        return res.status(404).send({message: 'Article not a found!!!'})
    }
    if(deleteArticle.user.toString() !== user._id.toString()){
        return res.status(403).send({message: 'You are not authorized to delete this article!!!'})
    }

    await Article.deleteOne({_id: req.params.id});
    return res.send({message:'ok'})
});

router.get('/article', async (req, res) => {
    try {
        const data = await Article.find();

        res.send(data)
    } catch (e) {
        res.status(400).send(e)
    }
});
module.exports = router;