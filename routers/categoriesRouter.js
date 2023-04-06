const express = require("express");
const router = express.Router();

class CategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getCategories);
    router.post("/", this.controller.addCategory);
    return router;
  }
}

module.exports = CategoriesRouter;
