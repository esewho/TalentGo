const { DataTypes } = require("sequelize")

module.exports = (database) => {
	const User = database.define("User", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
	})
	return User
}
