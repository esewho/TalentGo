const { Router } = require("express")

const path = require("path")
const JobsHandler = require("../handler/jobs.handler")
const { createJob } = require("../controller/jobs.controllers")

const JobRouter = Router()

const upload = multer({ storage })

JobRouter.get("/categories", JobsHandler.categoriesHandler)
JobRouter.get("/", JobsHandler.getJobs)
JobRouter.get("/:idJob", JobsHandler.getJobsById)

module.exports = JobRouter
