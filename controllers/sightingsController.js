const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel, categoryModel, sightingCategoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
    this.sightingCategoryModel = sightingCategoryModel;
  }

  // Retrieve specific sighting
  getSighting = async (req, res) => {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: {
          model: this.categoryModel,
          attributes: ["id", "name"],
          through: { attributes: ["intensity"] },
        },
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addSighting = async (req, res) => {
    const {
      date,
      country,
      region,
      cityTown,
      locationDescription,
      notes,
      categoryIds, // array of integers, e.g. [1, 2]
      intensityLevels, // array of integers of equal length as categoryIds
    } = req.body;
    try {
      const newSighting = await this.model.create({
        date: date,
        country: country,
        region: region,
        cityTown: cityTown,
        locationDescription: locationDescription,
        notes: notes,
      });
      for (let i = 0; i < categoryIds.length; i++) {
        await this.sightingCategoryModel.create({
          sightingId: newSighting.id,
          categoryId: categoryIds[i],
          intensity: intensityLevels[i],
        });
      }
      console.log("Added new row with id", newSighting.id);
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  updateSighting = async (req, res) => {
    const {
      date,
      country,
      region,
      cityTown,
      locationDescription,
      notes,
      categoryIds,
    } = req.body;
    try {
      const update = await this.model.update(
        {
          date: date,
          country: country,
          region: region,
          cityTown: cityTown,
          locationDescription: locationDescription,
          notes: notes,
        },
        {
          where: { id: req.params.sightingId },
        }
      );
      const updatedSighting = await this.model.findByPk(req.params.sightingId);
      const selectedCategories = await this.categoryModel.findAll({
        where: { id: categoryIds },
      });
      updatedSighting.setCategories(selectedCategories);
      console.log("Updated ", update[0], " row");
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
        order: [["created_at"]],
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
