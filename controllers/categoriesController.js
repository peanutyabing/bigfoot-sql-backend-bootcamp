class CategoriesController {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  getCategories = async (req, res) => {
    console.log("getting categories");
    try {
      const categories = await this.categoryModel.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addCategory = async (req, res) => {
    try {
      const newCategory = await this.categoryModel.create(req.body);
      return res.json(newCategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = CategoriesController;
