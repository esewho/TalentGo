import React, { useEffect, useState } from "react"
import style from "./jobDetail.module.css"
import { useParams, useLocation } from "react-router-dom"

export default function JobDetail() {
	const [job, setJob] = useState(null)
	const { jobId } = useParams()

	const location = useLocation()

	const { companyName } = location.state || {}

	const fetchJobDetail = async () => {
		const response = await fetch(
			`http://localhost:3001/jobs/${jobId}?company_name=${companyName}`
		).then((data) => data.json())
		setJob(response)
		console.log(response)
	}
	useEffect(() => {
		fetchJobDetail()
	}, [jobId])

	if (!job) return null

	return (
		<div className={style.jobDetail}>
			<h1>{job.title}</h1>
			<h2>{companyName}</h2>
			<h5>{job.job_type}</h5>
			<div dangerouslySetInnerHTML={{ __html: job.description }} />
		</div>
	)
}
