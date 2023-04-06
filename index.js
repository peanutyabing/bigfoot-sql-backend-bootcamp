const cors = require("cors");
const express = require("express");
require("dotenv").config();

const app = express();

// Enable CORS access to this server
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// importing Routers
const SightingsRouter = require("./routers/sightingsRouter.js");
const CategoriesRouter = require("./routers/categoriesRouter.js");

// importing Controllers
const SightingsController = require("./controllers/sightingsController.js");
const CategoriesController = require("./controllers/categoriesController.js");

// importing DB
const db = require("./db/models/index.js");
const { comment, sighting, category } = db;

// initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(sighting, comment);
const categoriesController = new CategoriesController(category);

// inittializing Routers
const sightingsRouter = new SightingsRouter(sightingsController).routes();
const categoriesRouter = new CategoriesRouter(categoriesController).routes();

// using the routers
app.use("/sightings", sightingsRouter);
app.use("/categories", categoriesRouter);

const PORT = process.env.EXPRESS_PORT;

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
