const { Job } = require("../common/config/db")
const { User } = require("../common/config/db")

class UserController {
	constructor() {}

	static async saveJobToUser(annonId, jobId) {
		const user = await User.findOne({
			where: { annonId },
		})
		const job = await Job.findByPk(jobId)
		if (!user) throw new Error("User not found")
		else if (!job) throw new Error("Job not found")

		console.log(user)

		await user.addSavedJob(job) // ✅ Usa el alias definido en el belongsToMany
		return "Job saved succesfully!"
	}

	static async createUser(annonId) {
		return await User.findOrCreate({
			where: { annonId },
			defaults: { annonId },
		})
	}

	static async getJobsFromUser(annonId, offset) {
		const user = await User.findOne({
			where: { annonId },
		})
		if (!user) throw new Error("No user found")

		return await Job.findAndCountAll({
			include: [
				{
					model: User,
					as: "savedJobs",
					where: { id: user.dataValues.id }, // filtra por el ID del usuario
					attributes: [], // evita traer info redundante del usuario
					through: { attributes: [] }, // oculta atributos de la tabla intermedia
				},
			],
			order: [["publication_date", "DESC"]],
			offset,
			limit: 9,
		})
	}
	static async removeJobFromUser(annonId, jobId) {
		const user = await User.findOne({ where: { annonId } })
		const job = await Job.findByPk(jobId)
		if (!user || !job) throw new Error("User or job not found")

		await user.removeSavedJob(job)
		return "Job removed successfully!"
	}
}

module.exports = UserController
