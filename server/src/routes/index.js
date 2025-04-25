const { Router } = require("express") // Importamos el Router de express

const JobsRouter = require("./jobs.routes.js") // Importamos el JobsRouter desde jobs.routes.js
const UserRouter = require("./user.routes.js") // Importamos el JobsRouter desde jobs.routes.js

const router = Router() // Creamos un nuevo Router de express

router.use("/jobs", JobsRouter) // Usamos el JobsRouter en la ruta /jobs de nuestro router
router.use("/users", UserRouter)

module.exports = router
