class RemotiveApi {
	static API_URL = "https://remotive.com/api/remote-jobs" // MOVER A .env

	static async getJobs({ limit = 20 }) {
		const response = await fetch(`${RemotiveApi.API_URL}?limit=${limit}`)
		const data = await response.json()
		return data
	}

	static async getCompany_nameJobs(idJob, company_name) {
		try {
			const response = await fetch(
				`${RemotiveApi.API_URL}?company_name=${company_name}`
			).then((data) => {
				return data.json()
			})

			if (response) {
				return response.jobs.find((job) => job.id == idJob)
			}
		} catch (error) {
			throw new Error(
				`No se ha encontrado trabajos con ese nombre: ${error.message}`
			)
		}
	}

	static async getJobsByTitle(title) {
		const response = await fetch(`${RemotiveApi.API_URL}`).then((data) => {
			return data.json()
		})
		if (response) {
			return response.jobs
		}
	}
	static async getCategories() {
		try {
			const response = await fetch(`${RemotiveApi.API_URL}?limit=50`).then(
				(data) => {
					return data.json()
				}
			)

			const categoriesSet = new Set(response.jobs.map((job) => job.category))
			return Array.from(categoriesSet)
		} catch (error) {
			throw new Error(error.message)
		}
	}
}

module.exports = RemotiveApi
