"use strict";

const express = require('express');
const router = express.Router();
const {createList, getAllLists, getListById, updateList, deleteList} = require('../controllers/lists_operation.js');
const {createItem, getItems, updateItem, deleteItem} = require('../controllers/items_operation.js');

router.use(function(req, res, next)
{
    next();
});

router.post('/lists', createList);
router.get('/lists', getAllLists);
router.get('/lists/:id', getListById);
router.put('/lists/:id', updateList);
router.delete('/lists/:id', deleteList);
router.post('/items', createItem);
router.get('/items', getItems);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);
router.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

module.exports = router;