const { DataTypes } = require("sequelize")

module.exports = (database) => {
	database.define("User", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		annonId: {
			type: DataTypes.STRING,
			primaryKey: false,
			allowNull: false,
			unique: true,
		},
	})
}
