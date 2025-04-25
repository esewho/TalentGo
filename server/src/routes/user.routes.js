const { Router } = require("express")

const UserHandler = require("../handler/user.handler")

const UserRouter = Router()

UserRouter.get("/:userId/savedJobs", UserHandler.getJobFromUserHandler)
UserRouter.post("/:userId/savedJobs/:jobId", UserHandler.saveJobToUserHandler)
UserRouter.delete(
	"/:userId/savedJobs/:jobId",
	UserHandler.removeJobsFromUserHandler
)

module.exports = UserRouter
