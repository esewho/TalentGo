const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (database) => {
  // defino el modelo
  database.define("Job", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isUrl: true,
      // },
    },
    title: {
      type: DataTypes.STRING,
      allownull: false,
      minLength: 3,
      maxLength: 255,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    company_logo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publication_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    candidate_required_location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      minLength: 3,
      maxLength: 255,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  });
};
