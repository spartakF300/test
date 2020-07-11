const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');


router.get('/', auth, async (req, res) => {

    try {
        const category = await Category.find();

        if (!category) {
            return res.status(404).send({message: 'Category not a found!!!'});
        }

        return res.send([{title:'All',_id:'all'},...category]);

    } catch (error) {
        return res.status(400).send(error);
    }
});
router.get('/category', async (req, res) => {
    try {
        const data = await Category.find();

        res.send(data)
    } catch (e) {
        res.status(404).send(e)
    }
});
router.get('/:id', auth, async (req, res) => {

    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send({message: 'Category not a found!!!'})
        }
        return res.send(category)
    } catch (e) {
        return res.status(500).send(e)
    }
});


router.post('/', auth, async (req, res) => {
    try {
        const categoryData = {
            title: req.body.title,

        };

        if (req.body.parent_id){
            categoryData.parent_id = req.body.parent_id;
        }
        const category = new Category(categoryData);

        await category.save();

        return res.send(category);

    } catch (error) {
        return res.status(400).send(error);
    }
});

router.put('/:id',[auth], async (req, res) => {
    const categoryData = req.body;
    const user = req.user;

    const editCategory = await Category.findById(req.params.id);

    if(!editCategory){
        return res.status(404).send({message: 'Category not a found!!!'})
    }
    if(editCategory.user.toString() !== user._id.toString() && user.role !== 'admin'){
        return res.status(403).send({message: 'You are not authorized to edit this category!!!'})
    }

    editCategory.title = categoryData.title;
    editCategory.parent_id = categoryData.parent_id;

    await editCategory.save();
    return res.send(editCategory)
});

router.delete('/:id',auth, async (req, res) => {

    const user = req.user;

    const deleteCategory = await Category.findById(req.params.id);

    if(!deleteCategory){
        return res.status(404).send({message: 'Category not a found!!!'})
    }
    if(deleteCategory.user.toString() !== user._id.toString() && user.role !== 'admin'){
        return res.status(403).send({message: 'You are not authorized to delete this category!!!'})
    }

    await Category.deleteOne({_id: req.params.id});

    return res.send({message:'ok'})
});



module.exports = router;