"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
var createError = require('http');
const Item = require('../models/item');
const getItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let items;
    try {
        items = yield Item.find();
        if (items.length > 0) {
            res.status(201).json(items);
        }
        else {
            res.json("Couldn't find items");
        }
    }
    catch (err) {
        const error = createError(500, "Couldn't retrieve items!" + err);
        return next(error);
    }
});
const createItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name, description } = req.body;
    const createdItem = new Item({
        name,
        description
    });
    try {
        yield createdItem.save();
    }
    catch (err) {
        const error = createError(500, 'Creating item failed, please try again.');
        return next(error);
    }
    res.status(201).json({ item: createdItem });
});
const updateItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.id;
    console.log(req.body);
    const { name, description } = req.body;
    let item;
    try {
        item = yield Item.findById(itemId);
    }
    catch (error) {
        return next(error);
    }
    item.name = name;
    item.description = description;
    try {
        const result = yield item.save();
    }
    catch (err) {
        return next(err);
    }
    res.status(200).json({ item: item.toObject({ getters: true }) });
});
const getItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let item;
    const itemId = req.params.id;
    try {
        item = yield Item.findById(itemId);
    }
    catch (err) {
        return next(err);
    }
    res.json({ item });
});
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let item;
    const itemId = req.params.id;
    try {
        item = yield Item.findById(itemId);
    }
    catch (err) {
        return next(err);
    }
    try {
        if (item) {
            yield item.remove();
        }
    }
    catch (err) {
        return next(err);
    }
    res.json({ message: 'Delete successfully' });
});
exports.getItems = getItems;
