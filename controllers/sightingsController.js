const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve specific sighting
  getSighting = async (req, res) => {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addSighting = async (req, res) => {
    try {
      const newSighting = await this.model.create(req.body);
      console.log("Added new row with id", newSighting.id);
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  updateSighting = async (req, res) => {
    try {
      console.log(req.params);
      console.log(req.body);
      const updatedSighting = await this.model.update(req.body, {
        where: { id: req.params.sightingId },
      });
      console.log("Updated ", updatedSighting[0], " row");
      return res.json(updatedSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getComments = async (req, res) => {
    try {
      console.log(req.params);
      const { sightingId } = req.params;
      const sighting = await this.model.findByPk(sightingId);
      const comments = await sighting.getComments();
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = SightingsController;
