const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Post a sighting
  async add(req, res) {
    try {
      const newSighting = await this.model.create(req.body);
      console.log("Added new row with id", newSighting.id);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
    try {
      const table = await this.model.findAll();
      return res.json(table);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
