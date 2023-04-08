const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model, categoryModel) {
    super(model);
    this.model = categoryModel;
  }

  addCategory = async (req, res) => {
    try {
      const newCategory = await this.model.create(req.body);
      return res.json(newCategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = CategoriesController;
