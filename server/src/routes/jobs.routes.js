const { Router } = require("express")
const multer = require("multer")
const path = require("path")
const JobsHandler = require("../handler/jobs.handler")
const { createJob } = require("../controller/jobs.controllers")

const JobRouter = Router()

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/")
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	},
})

const upload = multer({ storage })

JobRouter.get("/categories", JobsHandler.categoriesHandler)
JobRouter.get("/", JobsHandler.getJobs)
JobRouter.get("/:idJob", JobsHandler.getJobsById)
JobRouter.post("/", JobsHandler.createJob)
JobRouter.post("/", upload.single("company_logo"), createJob)

module.exports = JobRouter
