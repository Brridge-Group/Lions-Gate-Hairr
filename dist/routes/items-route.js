"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("express");
const itemsController = require('../controllers/items.controller');
const router = Router();
// Get All Items
router.get('/', itemsController.getItems);
/* // Get an Item
router.get('/:id', itemsController.getItem)

//Create new item
router.post('/', itemsController.createItem)

//Update item
router.patch('/:id', itemsController.updateItem)

//Delete item
router.delete('/:id', itemsController.deleteItem) */
exports.default = router;
