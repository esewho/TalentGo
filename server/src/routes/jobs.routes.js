const { Router } = require("express");

const JobsHandler = require("../handler/jobs.handler");

const JobRouter = Router();

JobRouter.get("/categories", JobsHandler.categoriesHandler);
JobRouter.get("/title", JobsHandler.searchJobs);
JobRouter.get("/", JobsHandler.getJobs);
JobRouter.get("/:idJob", JobsHandler.getJobsById);
JobRouter.post("/", JobsHandler.createJob);

module.exports = JobRouter;
