const { Router } = require("express")

const JobsHandler = require("../handler/jobs.handler")

const JobRouter = Router()

JobRouter.get("/categories", JobsHandler.categoriesHandler)
JobRouter.get("/", JobsHandler.getJobs)
JobRouter.get("/:idJob", JobsHandler.getJobsById)

module.exports = JobRouter
