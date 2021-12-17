import mongoose from "mongoose";

import config from "../config";
import Feature from "../models/feature";

const features: string[] = [
  "Free Parking",
  "Handicap Accessible",
  "French Service Available",
];

const seedFeatures = async (): Promise<void> => {
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

  // DELETES ALL DOCUMENTS IN FEATURE COLLECTION.
  await Feature.deleteMany({})
    .then(() => {
      console.log("Features sucessfully deleted!");
    })
    .catch((err) => {
      console.log("Features deletion failed!");
      console.log(err);
    });

  // SEEDS FEATURE COLLECTION WITH SERVICES ARRAY.
  for (let feature of features) {
    const featureDocument = new Feature({
      name: feature,
    });
    await featureDocument.save();
  }

  console.log(await Feature.find({}));

  // SHOWS DOCUMENTS IN FEATURE COLLECTION.
  const featureCollectionArray = await Feature.find({});
  console.log(featureCollectionArray);
};

seedFeatures()
  .then(() => {
    console.log("Features seeding successful!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Features seeding failed!");
    console.log(err);
  });
