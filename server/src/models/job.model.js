const { DataTypes } = require("sequelize")
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
		tags: {
			type: DataTypes.ARRAY(DataTypes.STRING),
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
			type: DataTypes.TEXT,
			allowNull: false,
		},
		salary: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		jobId: {
			type: DataTypes.INTEGER,
			unique: true,
			allowNull: true,
		},
	})
}
