const UserController = require("../controller/user.controllers")

class UserHandler {
	constructor() {}
	static async saveJobToUserHandler(req, res) {
		try {
			const { userId, jobId } = req.params
			const message = await UserController.saveJobToUser(userId, jobId)

			return res.status(200).json(message)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}

	static async getJobFromUserHandler(req, res) {
		try {
			const { userId } = req.params
			const savedJobs = await UserController.getJobsFromUser(userId)
			return res.status(200).json(savedJobs)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}

	static async removeJobsFromUserHandler(req, res) {
		try {
			const { userId, jobId } = req.params
			const message = await UserController.removeJobFromUser(userId, jobId)
			return res.status(200).json(message)
		} catch (error) {
			return res.status(500).json({ error: message.error })
		}
	}
}

module.exports = UserHandler
