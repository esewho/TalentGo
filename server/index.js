const server = require("./src/server")
const { conn } = require("./src/common/config/db")
const { updateDatabase } = require("./src/services/jobs.service")
const PORT = process.env.PORT || 3001

conn
	.sync({ force: true }) // Sincronizamos los modelos con la base de datos
	.then(() => {
		updateDatabase()
		server.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`)
		})
	})
	.catch((error) => console.error(error))
