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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const service_1 = __importDefault(require("../models/service"));
const services = [
    "Coloring Services",
    "Hair Extension Services",
    "Hair Treatment Services",
    "Hairstyling Services",
    "Kids' Haircuts",
    "Men's Haircuts",
    "Perming Services",
    "Women's Haircuts",
];
const seedServices = () => __awaiter(void 0, void 0, void 0, function* () {
    // CONNECTS TO MONGO DATABSE.
    yield mongoose_1.default
        .connect(config_1.default.databaseURL, {})
        .then(() => {
        console.log("MongoDB sucessfully connected!");
    })
        .catch((err) => {
        console.log("MongoDB connection failed!");
        console.log(err);
    });
    // DELETES ALL DOCUMENTS IN SERVICE COLLECTION.
    yield service_1.default.deleteMany({})
        .then(() => {
        console.log("Services sucessfully deleted!");
    })
        .catch((err) => {
        console.log("Services deletion failed!");
        console.log(err);
    });
    // SEEDS SERVICE COLLECTION WITH SERVICES ARRAY.
    for (let service of services) {
        const serviceDocument = new service_1.default({
            name: service,
        });
        yield serviceDocument.save();
    }
    console.log(yield service_1.default.find({}));
    // SHOWS SERVICES IN SERVICE COLLECTION.
    // const serviceCollectionArray = await Service.find({});
    // console.log(serviceCollectionArray);
});
seedServices()
    .then(() => {
    console.log("Services seeding successful!");
})
    .catch((err) => {
    console.log("Services seeding failed!");
    console.log(err);
});
