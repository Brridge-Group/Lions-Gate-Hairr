import express from "express";
import config from "./config";
import indexLoader from "./loaders/index";

const startServer = async () => {
  const app = express();

  await indexLoader(app);

  const port = config.port || 5000;

  try {
    app.listen(port);
    console.log(`Your server is ready! Listening at port ${5000}!`);
  } catch (error) {
    console.log("Error on ./index.ts ", error);
  }
};

startServer();
