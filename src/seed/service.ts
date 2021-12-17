import mongoose from "mongoose";

import config from "../config";
import Service from "../models/service";

const services: string[] = [
  "Coloring Services",
  "Hair Extension Services",
  "Hair Treatment Services",
  "Hairstyling Services",
  "Kids' Haircuts",
  "Men's Haircuts",
  "Perming Services",
  "Women's Haircuts",
];

const seedServices = async (): Promise<void> => {
  // CONNECTS TO MONGO DATABSE.
  await mongoose
    .connect(config.databaseURL, {})
    .then(() => {
      console.log("MongoDB sucessfully connected!");
    })
    .catch((err) => {
      console.log("MongoDB connection failed!");
      console.log(err);
    });

  // DELETES ALL DOCUMENTS IN SERVICE COLLECTION.
  await Service.deleteMany({})
    .then(() => {
      console.log("Services sucessfully deleted!");
    })
    .catch((err) => {
      console.log("Services deletion failed!");
      console.log(err);
    });

  // SEEDS SERVICE COLLECTION WITH SERVICES ARRAY.
  for (let service of services) {
    const serviceDocument = new Service({
      name: service,
    });
    await serviceDocument.save();
  }

  console.log(await Service.find({}));

  // SHOWS SERVICES IN SERVICE COLLECTION.
  const serviceCollectionArray = await Service.find({});
  console.log(serviceCollectionArray);
};

seedServices()
  .then(() => {
    console.log("Services seeding successful!");
  })
  .catch((err) => {
    console.log("Services seeding failed!");
    console.log(err);
  });
