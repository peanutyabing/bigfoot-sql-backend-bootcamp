const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // sighting-related requests
    router.get("/", this.controller.getAllSightings);
    router.get("/:sightingId", this.controller.getSighting);
    router.post("/", this.controller.addSighting);
    router.put("/:sightingId", this.controller.updateSighting);

    // comment-related requests
    router.get("/:sightingId/comments", this.controller.getComments);
    router.post("/:sightingId/comments", this.controller.addComment);
    return router;
  }
}

module.exports = SightingsRouter;
