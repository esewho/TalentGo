const { Router } = require("express")

const UserHandler = require("../handler/user.handler")

const UserRouter = Router()

UserRouter.post("/:annonId", UserHandler.createAnonymousUserHandler)
UserRouter.get("/:annonId/savedJobs", UserHandler.getJobFromUserHandler)
UserRouter.post("/:annonId/savedJobs/:jobId", UserHandler.saveJobToUserHandler)
UserRouter.delete(
	"/:annonId/savedJobs/:jobId",
	UserHandler.removeJobsFromUserHandler
)

module.exports = UserRouter
