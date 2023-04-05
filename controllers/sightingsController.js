const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(sightingModel, commentModel) {
    super(sightingModel);
    this.commentModel = commentModel;
  }

  // Retrieve specific sighting
  getSighting = async (req, res) => {
    const { sightingId } = req.params;
    try {
      const sighting = await this.sightingModel.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addSighting = async (req, res) => {
    try {
      const newSighting = await this.sightingModel.create(req.body);
      console.log("Added new row with id", newSighting.id);
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  updateSighting = async (req, res) => {
    try {
      const updatedSighting = await this.sightingModel.update(req.body, {
        where: { id: req.params.sightingId },
      });
      console.log("Updated ", updatedSighting[0], " row");
      return res.json(updatedSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getComments = async (req, res) => {
    const { sightingId } = req.params;
    console.log(req.params);
    try {
      const comments = await this.commentModel.findAll({
        where: { sightingId: sightingId },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addComment = async (req, res) => {
    const { sightingId } = req.params;
    const requestBody = req.body;
    requestBody.sightingId = sightingId;
    try {
      const newComment = await this.commentModel.create(requestBody);
      console.log("Added new comment: ", newComment.dataValues);
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  updateComment = async (req, res) => {
    try {
      const updatedComment = await this.commentModel.update(req.body, {
        where: { id: req.params.commentId },
      });
      console.log("Updated ", updatedComment[0], " comment");
      return res.json(updatedComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = SightingsController;
