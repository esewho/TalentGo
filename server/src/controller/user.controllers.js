const { Job } = require("../common/config/db")
const { User } = require("../common/config/db")

class UserController {
	constructor() {}

	static async saveJobToUser(userId, jobId) {
		try {
			const user = await User.findByPk(userId)
			const job = await Job.findByPk(jobId)
			if (!user || !job) throw new Error("User or job not found")
			await user.addJob(job)
			return "Job saved succesfully!"
		} catch (error) {
			console.log({ error: error.message })
		}
	}

	static async getJobsFromUser(anonId) {
		const user = await User.findByPk(anonId, {
			include: {
				model: Job,
				through: { attributes: [] },
			},
		})
		if (!user) throw new Error("User not found")
		return user.Jobs
	}

	static async removeJobFromUser(userId, jobId) {
		const user = await User.findByPk(userId)
		const job = await Job.findByPk(jobId)
		if (!user || !job) throw new Error("User or job not found")

		await user.removeJob(job)
		return "Job removed successfully!"
	}
}

module.exports = UserController
