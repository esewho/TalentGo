import React from "react"
import { useState } from "react"
import style from "./createJobForm.module.css"

export default function CreateJobForm() {
	const [jobData, setJobData] = useState({
		title: "",
		description: "",
		salary: 0,
		category: "",
		company: "",
		location: "",
	})

	const handleChange = (e) => {
		setJobData({ ...jobData, [e.target.name]: e.target.value })
	}
	return (
		<div className={style.mainContainer}>
			<div className={style.formContainer}>
				<h2>Create a new Job</h2>
				<form>
					<label>Job Name</label>
					<input
						type="text"
						name="title"
						id="title"
						onChange={handleChange}
						placeholder="Frontend Developer"
					/>
					<label>Salary</label>
					<input
						type="number"
						name="salary"
						id="salary"
						onChange={handleChange}
						placeholder="Ej: 2500$"
					/>
					<label>Category</label>
					<input
						type="text"
						name="category"
						id="category"
						onChange={handleChange}
						placeholder="Ej: Marketing"
					/>
					<label>Company</label>
					<input
						type="text"
						name="company"
						id="Company"
						onChange={handleChange}
						placeholder="Ej: Google"
					/>
					<label>Location</label>
					<input
						type="text"
						name="location"
						id="location"
						onChange={handleChange}
						placeholder="Ej: USA"
					/>
					<label>Description</label>
					<textarea
						className={style.description}
						type="text"
						name="description"
						id="description"
						onChange={handleChange}
						placeholder="Describe the job here..."
					/>

					<button className={style.buttonSubmit} type="submit">
						Submit
					</button>
				</form>
			</div>
			<div className={style.previewContainer}>
				<h2>Job Preview</h2>
				<div className={style.jobCard}>
					<h3>{jobData.title || "Job Name"}</h3>
					<p>
						{" "}
						<strong>Salary: </strong>
						{jobData.salary ? `$${jobData.salary}` : "Not specified"}
					</p>
					<p>
						{" "}
						<strong>Category: </strong>
						{jobData.category || "Job Category"}
					</p>
					<p>
						<strong>Company: </strong>
						{jobData.company || "Company"}
					</p>
					<p>
						<strong>Location: </strong>
						{jobData.location}
					</p>
					<p style={{ whiteSpace: "pre-line" }}>
						<strong>Description: </strong>
						<p>{jobData.description}</p>
					</p>
				</div>
			</div>
		</div>
	)
}
