const cors = require("cors");
const express = require("express");
require("dotenv").config();

const app = express();

// Enable CORS access to this server
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// importing Routers
const SightingsRouter = require("./routers/sightingsRouter");

// importing Controllers
const SightingsController = require("./controllers/sightingsController");

// importing DB
const db = require("./db/models/index.js");
const { comment, sighting } = db;

// initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(sighting, comment);

// inittializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes();

// using the routers
app.use("/sightings", sightingRouter);

const PORT = process.env.EXPRESS_PORT;

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
