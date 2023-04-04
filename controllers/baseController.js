const { Op } = require("sequelize");

class BaseController {
  constructor(model) {
    this.model = model;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  getAll = async (req, res) => {
    try {
      const table = await this.model.findAll(
        { where: this.processQueryParams(req.query) },
        { order: [["date"]] }
      );
      return res.json(table);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  processQueryParams = (queryParams) => {
    const year = queryParams.date;
    const nextYear = (parseInt(year) + 1).toString();
    if (year) {
      queryParams.date = {
        [Op.between]: [
          new Date(`${year}-01-01`).toISOString(),
          new Date(`${nextYear}-01-01`).toISOString(),
        ],
      };
    }
    return queryParams;
  };
}

module.exports = BaseController;
