const { Op } = require("sequelize")

const { Job } = require("../common/config/db")
const { Category } = require("../common/config/db")

class JobsController {
	static async getJobs({ offset = 0, title }) {
		try {
			const jobsFromDb = await Job.findAndCountAll({
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
									[Op.iLike]: `%${title.toLowerCase()}%`, // 🔥 Buscar también en la descripción
								},
							},
						],
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
			console.log(jobsFromDb)

			return jobsFromDb
		} catch (error) {
			throw new Error(`Error al obtener los trabajos: ${error.message}`)
		}
	}

	static async getJobsById(idJob) {
		try {
			const jobFromDb = await Job.findOne({
				where: { id: idJob },
				include: {
					model: Category,
					atributes: ["id", "name"],
					through: { attributes: [] },
				},
			})
			if (jobFromDb) {
				return jobFromDb
			}
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
			const categories = await RemotiveApi.getCategories()

			for (const name of categories) {
				await Category.findOrCreate({ where: { name: name } })
			}
			const allCategories = await Category.findAll({})
			return allCategories
		} catch (error) {
			throw new Error("Error al manejar categorías" + error.message)
		}
	}
}
module.exports = JobsController
