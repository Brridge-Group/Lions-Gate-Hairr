import mongoose from "mongoose";
const Schema = mongoose.Schema;

import config from "../config";
import Service from "../models/service";
import Feature from "../models/feature";
import Business from "../models/business";

const businesses = [
  {
    name: "Test Salon 1",
    description: "This is the first test salon.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    address: {
      street: "142 Columbus Heights",
      postalCode: "R3R7D3",
      city: "Vancouver",
      region: "BC",
      country: "Canada",
    },
    services: [],
    features: [],
    stars: 4,
    phone: "8479375498",
  },
];

const seedBusinesses = async (): Promise<void> => {
  // CONNECTS TO MONGO DATABSE.
  await mongoose
    .connect(config.databaseURL, {})
    .then(() => {
      console.log("MongoDB connection successful!");
    })
    .catch((err) => {
      console.log("MongoDB connection failed!");
      console.log(err);
    });

  // DELETES ALL DOCUMENTS IN BUSINESS COLLECTION.
  await Business.deleteMany({})
    .then(() => {
      console.log("Businesses deletion successful!");
    })
    .catch((err) => {
      console.log("Businesses deletion failed!");
      console.log(err);
    });

  // FETCHES ARRAY OF ALL SERVICES.
  const services = await Service.find({});

  // FETCHES ARRAY OF ALL SERVICES.
  const features = await Feature.find({});

  // SEEDS BUSINESS COLLECTION WITH BUSINESSES ARRAY, ADDING 3 SERVICES & 3 FEATURES TO EACH BUSINESS.
  for (let business of businesses) {
    const businessDocument = new Business(business);
    for (let i = 0; i < 3; ++i) {
      businessDocument.services.push(services[i]);
      businessDocument.features.push(features[i]);
    }
    await businessDocument.save();
  }

  // SHOWS BUSINESSES IN BUSINESS COLLECTION.
  const businessesCollectionArray = await Business.find({});
  console.log(businessesCollectionArray);
};

seedBusinesses()
  .then(() => {
    console.log("Businesses seeding successful!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Businesses seeding failed!");
    console.log(err);
  });
