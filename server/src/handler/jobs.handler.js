const JobsController = require("../controller/jobs.controllers")

class JobsHandler {
	constructor() {}
	static async getJobs(req, res) {
		try {
			const { title, offset, category, location } = req.query

			const jobs = await JobsController.getJobs({
				title,
				offset,
				category,
				location,
			})
			return res.status(200).json(jobs)
		} catch (error) {
			console.log(error)
			return res.status(400).json({ error: error.message })
		}
	}

	static async getLocations(req, res) {
		try {
			const locations = await JobsController.getLocations()
			res.status(200).json(locations)
		} catch (error) {
			console.log("Error en el handler de locations", error)
			res.status(500).json({ error: error.message })
		}
	}

	static async getJobsById(req, res) {
		try {
			const { idJob } = req.params
			const { annonId } = req.query

			const job = await JobsController.getJobsById(idJob, annonId)
			if (job) {
				return res.status(200).json(job)
			} else {
				return res.status(400).json({ error: "Trabajo no encontrado" })
			}
		} catch (error) {
			return res.status(400).json({ error: error.message })
		}
	}

	static async createJob(req, res) {
		try {
			const {
				title,
				url,
				company_name,
				category,
				job_type,
				publication_date,
				candidate_required_location,
				salary,
				description,
				company_logo,
			} = req.body

			let { tags } = req.body
			tags = tags.split(", ")

			if (
				!title ||
				!company_name ||
				!category ||
				!job_type ||
				!salary ||
				!url ||
				!description
			) {
				throw new Error("Faltan datos obligatorios por rellenar")
			}

			const newJob = JobsController.createJob({
				title,
				url,
				company_name,
				company_logo,
				category,
				job_type,
				publication_date,
				candidate_required_location,
				salary,
				description,
				tags,
			})
			if (newJob) {
				return res.status(200).json(newJob)
			}
			return res.status(400).json({ error: "No se ha podido crear el trabajo" })
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}

	static async categoriesHandler(req, res) {
		try {
			const categories = await JobsController.getCategories()

			return res.status(200).json(categories)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}
}

module.exports = JobsHandler
