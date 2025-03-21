import React from "react"
import style from "./jobList.module.css"
import CardJob from "../CardJob/CardJob"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function JobList() {
	const [jobs, setJobs] = useState([])

	const queryInput = useSelector((state) => state.search.queryInput)

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		fetch(`http://localhost:3001/jobs?title=${queryInput}`)
			.then((response) => response.json())
			.then((data) => setJobs(data))
			.catch((error) => console.log("Error al obtener los trabajos", error))
			.finally(() => setLoading(false))
	}, [queryInput])

	return (
		<div className={style.container}>
			{!loading ? (
				jobs.map((job) => <CardJob key={job.id} job={job} />)
			) : (
				<p>Cargando trabajos...</p>
			)}
		</div>
	)
}
