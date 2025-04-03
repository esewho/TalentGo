const { Job, Category } = require("../common/config/db")
const RemotiveApi = require("../../remotive-api/remotive-api.lib")

const updateDatabase = async () => {
	const response = await RemotiveApi.getJobs({ limit: 1 })
	const jobs = await RemotiveApi.getJobs({
		limit: response["total-job-count"],
	}).then((data) => data.jobs)
	// .catch((error) => console.log(error))
	// console.log(jobs)

	for (const job of jobs) {
		let existingJob = await Job.findOne({
			where: { jobId: job.id },
		})

		if (!existingJob) {
			const newJob = await Job.create({
				jobId: job.id,
				url: job.url,
				title: job.title,
				company_name: job.company_name,
				company_logo: job.company_logo,
				category: job.category,
				tags: job.tags,
				job_type: job.job_type,
				publication_date: job.publication_date,
				candidate_required_location: job.candidate_required_location,
				salary: job.salary,
				description: job.description,
			})

			let categoryDB = await Category.findOne({
				where: { name: job.category },
			})
			if (!categoryDB) {
				categoryDB = await Category.create({ name: job.category })
			}
			await newJob.addCategory(categoryDB)
		}
	}
}

module.exports = { updateDatabase }
