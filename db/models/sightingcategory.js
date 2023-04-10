"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SightingCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.sighting);
      this.belongsTo(models.category);
    }
  }
  SightingCategory.init(
    {
      sightingId: {
        type: DataTypes.INTEGER,
        references: { model: "sighting", key: "id" },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: { model: "category", key: "id" },
      },
      intensity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "sightingCategory",
      tableName: "sighting_categories",
      underscored: true,
    }
  );
  return SightingCategory;
};
