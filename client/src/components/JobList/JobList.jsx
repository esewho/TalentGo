import React from "react"
import style from "./jobList.module.css"
import CardJob from "../CardJob/CardJob"
import { useEffect, useState } from "react"

export default function JobList() {
	const [jobs, setJobs] = useState([])

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		fetch("http://localhost:3001/jobs")
			.then((response) => response.json())
			.then((data) => setJobs(data))
			.catch((error) => console.log("Error al obtener los trabajos", error))
			.finally(() => setLoading(false))
	}, [])

	return (
		<div className={style.container}>
			{!loading ? (
				jobs.map((job) => <CardJob key={job.id} job={job} />)
			) : (
				<p style={{ color: "black" }}>Cargando trabajos...</p>
			)}
		</div>
	)
}
