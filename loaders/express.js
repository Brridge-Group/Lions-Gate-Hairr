const express = require("express");
const path = require("path");
const generatePassword = require("password-generator");
const cors = require("cors");

const itemsRoutes = require("../routes/items-route");
const usersRoutes = require("../routes/users");

const loader = async (app) => {
  app.use(express.json());

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "../client/build")));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    //res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
  });
  const corsOptions = {
    origin: true,
    credentials: true,
  };
  app.get("*", (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  app.enable("trust proxy");
  app.use(cors(corsOptions));

  app.use("/api/items", itemsRoutes);
  app.use("/api/users", usersRoutes);

  // ...More middlewares

  return app;
};

module.exports = loader;
