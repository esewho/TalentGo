require("dotenv").config()
const { Sequelize } = require("sequelize")

const fs = require("fs")
const path = require("path")
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
	{
		logging: false,
		native: false,
	}
)
const basename = path.basename(__filename)

const modelDefiners = []

fs.readdirSync(path.join(__dirname, "../../models")) // Lee todos los archivos de la carpeta models
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" // Filtra los archivos que no empiezan con . y que no sean index.js
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "../../models", file))) // Agrega los modelos a la lista modelDefiners
	})

modelDefiners.forEach((model) => model(sequelize)) // Inyecta la conexion a sequelize a todos los modelos

let entries = Object.entries(sequelize.models) // Convierte el objeto en un array de arrays
let capsEntries = entries.map((entry) => [
	// Convierte la primera letra de cada modelo en mayúscula
	entry[0][0].toUpperCase() + entry[0].slice(1), // Capitaliza la primera letra
	entry[1], // Agrega el modelo
])
sequelize.models = Object.fromEntries(capsEntries) // Convierte el array de arrays en un objeto

const { Job, Category, User } = sequelize.models

Job.belongsToMany(Category, { through: "job_category" })
Category.belongsToMany(Job, { through: "job_category" })
User.belongsToMany(Job, {
	through: "saved_jobs",
	as: "savedJobs",
	foreignKey: "userId",
})
Job.belongsToMany(User, {
	through: "saved_jobs",
	as: "savedJobs",
	foreignKey: "jobId",
})

// Aca vendrian las relaciones !@IMPORTANT Definir las relaciones

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
}
