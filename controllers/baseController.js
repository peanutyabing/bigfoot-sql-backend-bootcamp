const { Op } = require("sequelize");

class BaseController {
  constructor(sightingModel) {
    this.sightingModel = sightingModel;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  getAllSightings = async (req, res) => {
    try {
      const table = await this.sightingModel.findAll({
        where: this.processQueryParams(req.query),
        order: [["date"]],
      });
      return res.json(table);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  processQueryParams = (queryParams) => {
    if (queryParams.date) {
      const [startDate, endDate] = queryParams.date.split("~");
      queryParams.date = {
        [Op.between]: [startDate, endDate],
      };
    }
    return queryParams;
  };
}

module.exports = BaseController;
