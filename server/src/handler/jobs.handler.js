const JobsController = require("../controller/jobs.controllers")

class JobsHandler {
	constructor() {}
	static async getJobs(req, res) {
		try {
			const { title, offset } = req.query

			const jobs = await JobsController.getJobs({ title, offset })
			return res.status(200).json(jobs)
		} catch (error) {
			console.log(error)
			return res.status(400).json({ error: error.message })
		}
	}

	static async getJobsById(req, res) {
		try {
			const { idJob } = req.params

			const job = await JobsController.getJobsById(idJob)
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
			console.log("Request body:", req.body) // 🔍 Ver qué llega
			console.log("Uploaded file:", req.file) // 🔍 Ver qué llega
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
			} = req.body

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
