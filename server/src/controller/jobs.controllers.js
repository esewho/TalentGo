const { Op } = require("sequelize")
const { Job } = require("../common/config/db")
const { User } = require("../common/config/db")
const { Category } = require("../common/config/db")

class JobsController {
	static async getJobs({ offset = 0, title, category, location }) {
		try {
			const jobsFromDb = await Job.findAndCountAll({
				order: [["publication_date", "DESC"]],
				where: {
					...(title && {
						[Op.or]: [
							{
								title: {
									[Op.iLike]: `%${title.toLowerCase()}%`,
								},
							},
							{
								description: {
									[Op.iLike]: `%${title.toLowerCase()}%`, //  Buscar también en la descripción
								},
							},
						],
					}),
					...(category && {
						category: {
							[Op.iLike]: `%${category.toLowerCase()}%`,
						},
					}),

					...(location && {
						candidate_required_location: {
							[Op.iLike]: `%${location.toLowerCase()}%`,
						},
					}),
				},
				include: {
					model: Category,
					attributes: ["id", "name"],
					through: { attributes: [] },
				},
				offset: offset,

				limit: 9,
			})

			return jobsFromDb
		} catch (error) {
			throw new Error(`Error al obtener los trabajos: ${error.message}`)
		}
	}

	static async getJobsById(idJob, annonId) {
		try {
			const jobFromDb = await Job.findOne({
				where: { id: idJob },
				include: {
					model: Category,
					atributes: ["id", "name"],
					through: { attributes: [] },
				},
			})
			if (!jobFromDb) {
				throw new Error("No jobs found")
			}
			if (annonId) {
				const user = await User.findOne({
					where: { annonId },
				})

				if (user) {
					const saved = await user.hasSavedJobs(jobFromDb)
					jobFromDb.dataValues.isSaved = saved
				} else {
					jobFromDb.dataValues.isSaved = false
				}
			}
			return jobFromDb
		} catch (error) {
			throw new Error(
				`Error al obtener el trabajo con ID ${idJob}: ${error.message}`
			)
		}
	}

	static async createJob(job) {
		const newJob = await Job.create(job)

		let categoryDB = await Category.findOne({
			where: { name: job.category },
		})
		if (!categoryDB) {
			categoryDB = await Category.create({ name: job.category })
		}
		await newJob.addCategory(categoryDB)
		return newJob
	}

	static async getCategories() {
		try {
			const allCategories = await Category.findAll({})
			return allCategories
		} catch (error) {
			throw new Error("Error al manejar categorías" + error.message)
		}
	}

	static async getLocations() {
		try {
			const allLocations = await Job.findAll({
				attributes: ["candidate_required_location"],
				group: ["candidate_required_location"],
				raw: true,
			})
			return allLocations
		} catch (error) {
			console.log({ error: error.message })
		}
	}
}
module.exports = JobsController
