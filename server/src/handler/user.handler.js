const UserController = require("../controller/user.controllers")

class UserHandler {
	constructor() {}
	static async saveJobToUserHandler(req, res) {
		try {
			const { annonId, jobId } = req.params
			const message = await UserController.saveJobToUser(annonId, jobId)

			return res.status(200).json(message)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ error: error.message })
		}
	}

	static async getJobFromUserHandler(req, res) {
		try {
			const { annonId } = req.params
			const { offset } = req.query
			const savedJobs = await UserController.getJobsFromUser(annonId, offset)
			return res.status(200).json(savedJobs)
		} catch (error) {
			console.error(error)
			return res.status(500).json({ error: error.message })
		}
	}

	static async removeJobsFromUserHandler(req, res) {
		try {
			const { annonId, jobId } = req.params
			console.log(annonId)
			console.log(jobId)

			const message = await UserController.removeJobFromUser(annonId, jobId)

			return res.status(200).json(message)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ error: message.error })
		}
	}

	static async createAnonymousUserHandler(req, res) {
		try {
			const { annonId } = req.params
			const message = await UserController.createUser(annonId)
			return res.status(200).json(message)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}
}

module.exports = UserHandler
