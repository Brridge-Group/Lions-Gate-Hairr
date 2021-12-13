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
const Schema = mongoose_1.default.Schema;
const config_1 = __importDefault(require("../config"));
const service_1 = __importDefault(require("../models/service"));
const business_1 = __importDefault(require("../models/business"));
const businesses = [
    {
        name: "Test Salon 1",
        description: "This is the first test salon.",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
        address: {
            street: "142 Columbus Heights",
            postalCode: "R3R7D3",
            city: "Vancouver",
            region: "BC",
            country: "Canada",
        },
        services: [],
        stars: 4,
        phone: "8479375498",
    },
];
const seedBusinesses = () => __awaiter(void 0, void 0, void 0, function* () {
    // CONNECTS TO MONGO DATABSE.
    yield mongoose_1.default
        .connect(config_1.default.databaseURL, {})
        .then(() => {
        console.log("MongoDB connection successful!");
    })
        .catch((err) => {
        console.log("MongoDB connection failed!");
        console.log(err);
    });
    // DELETES ALL DOCUMENTS IN BUSINESS COLLECTION.
    yield business_1.default.deleteMany({})
        .then(() => {
        console.log("Businesses deletion successfull!");
    })
        .catch((err) => {
        console.log("Businesses deletion failed!");
        console.log(err);
    });
    // FETCHES ARRAY OF ALL SERVICES.
    const services = yield service_1.default.find({});
    // SEEDS BUSINESS COLLECTION WITH BUSINESSES ARRAY, ADDING FOUR SERVICES TO EACH BUSINESS.
    for (let business of businesses) {
        const businessDocument = new business_1.default(business);
        for (let i = 0; i < 4; ++i) {
            businessDocument.services.push(services[i]);
        }
        yield businessDocument.save();
    }
    // SHOWS BUSINESSES IN BUSINESS COLLECTION.
    const businessesCollectionArray = yield business_1.default.find({});
    console.log(businessesCollectionArray);
});
seedBusinesses()
    .then(() => {
    console.log("Businesses seeding successful!");
    mongoose_1.default.connection.close();
})
    .catch((err) => {
    console.log("Businesses seeding failed!");
    console.log(err);
});
