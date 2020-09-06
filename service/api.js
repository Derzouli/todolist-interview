"use strict";

const express = require('express');
const router = express.Router();
const {get_lists, getDict } = require('../models/data_model.js');
const {check_param_name } = require('../tools/utils.js');
const {createList, getAllLists, deleteList} = require('../controllers/lists_operation.js');
const {createItem, getItems, updateItem, deleteItem} = require('../controllers/items_operation.js');

router.use(function(req, res, next)
{
    next();
});
router.use('/todo/:list', function(req, res) {
    var lists = get_lists();
    if (check_param_name(req.params.list) == true)
    {
        if (lists.includes(req.params.list) === true)
        {
            var list = getDict(req.params.list);
            return res.render('todo_items.ejs', {todolist: list,
                                            listname: req.params.list})
        }
    }
    return res.status(404).send('Sorry cant find that!');
});
router.use('/todo', function(req, res) {
    var lists = get_lists();
    return res.render('todo_lists.ejs', {lists: lists})
});
router.post('/lists', createList);
router.get('/lists', getAllLists);
router.delete('/lists/:name', deleteList);
router.post('/items', createItem);
router.get('/items', getItems);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);
router.use(function(req, res, next) {
    return res.redirect("/todo");
});

module.exports = router;