const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve specific sighting
  getOne = async (req, res) => {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  add = async (req, res) => {
    try {
      const newSighting = await this.model.create(req.body);
      console.log("Added new row with id", newSighting.id);
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  update = async (req, res) => {
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
}

module.exports = SightingsController;
