import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import style from "./createJobForm.module.css"
import axios from "axios"

export default function CreateJobForm() {
	const [jobData, setJobData] = useState({
		title: "",
		url: "",
		logo: null,
		logoUrl: "",
		type: "",
		publication_date: "",
		description: "",
		salary: 0,
		category: "",
		company: "",
		location: "",
	})
	const navigate = useNavigate()

	const handleChange = (e) => {
		if (e.target.name === "logo") {
			const file = e.target.files[0]
			setJobData({
				...jobData,
				logo: file,
				logoUrl: URL.createObjectURL(file),
			})
		} else {
			setJobData({ ...jobData, [e.target.name]: e.target.value })
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const data = new FormData()
		data.append("title", jobData.title)
		data.append("url", jobData.url)
		data.append("logo", jobData.logo)
		data.append("type", jobData.type)
		data.append("publication_date", jobData.publication_date)
		data.append("description", jobData.description)
		data.append("salary", jobData.salary)
		data.append("category", jobData.category)
		data.append("company", jobData.company)
		data.append("location", jobData.location)

		try {
			const response = await axios.post(`http://localhost:3001/jobs`, data, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			const jobId = response.data.id
			navigate(`/jobs/${jobId}`)
			console.log("Job created: ", response.data)
			alert("Succesfully created!")
		} catch (error) {
			console.error("Failed to create", error)
			alert("Something went bad")
		}
	}

	return (
		<div className={style.mainContainer}>
			<div className={style.formContainer}>
				<h2>Create a new Job</h2>
				<form onSubmit={handleSubmit}>
					<label>Job Name</label>
					<input
						type="text"
						name="title"
						value={jobData.title}
						id="title"
						onChange={handleChange}
						placeholder="Ej: Frontend Developer"
					/>
					<label>URL</label>
					<input
						type="text"
						name="url"
						value={jobData.url}
						id="url"
						onChange={handleChange}
						placeholder="Ej: google.com"
					/>

					<label>Salary</label>
					<input
						type="number"
						name="salary"
						value={jobData.salary}
						id="salary"
						onChange={handleChange}
						placeholder="Ej: 2500$"
					/>
					<label>Category</label>
					<input
						type="text"
						name="category"
						value={jobData.category}
						id="category"
						onChange={handleChange}
						placeholder="Ej: Marketing"
					/>
					<label>Company</label>
					<input
						type="text"
						name="company"
						value={jobData.company}
						id="Company"
						onChange={handleChange}
						placeholder="Ej: Google"
					/>
					<label>Location</label>
					<input
						type="text"
						name="location"
						value={jobData.location}
						id="location"
						onChange={handleChange}
						placeholder="Ej: USA"
					/>
					<label>Logo</label>
					<input
						type="file"
						name="logo"
						id="logo"
						accept="image/*"
						onChange={handleChange}
					/>
					<label>Description</label>
					<textarea
						className={style.description}
						type="text"
						name="description"
						value={jobData.description}
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
					<h3>{jobData.title}</h3>
					<p>
						<strong>URL: </strong>
						{jobData.url}
					</p>
					<p>
						<strong>Salary: </strong>
						{`$${jobData.salary}`}
					</p>
					<p>
						<strong>Category: </strong>
						{jobData.category}
					</p>
					<p>
						<strong>Company: </strong>
						{jobData.company}
					</p>
					<p>
						<strong>Location: </strong>
						{jobData.location}
					</p>
					<p>
						<strong>Logo: </strong>
						{jobData.logoUrl ? (
							<img
								src={jobData.logoUrl}
								alt="job logo"
								style={{
									width: "100px",
									height: "100px",
									objectFit: "cover",
									borderRadius: "100px",
								}}
							/>
						) : (
							<p>No logo uploaded</p>
						)}
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
