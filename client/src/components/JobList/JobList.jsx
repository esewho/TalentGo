import React from "react"
import style from "./jobList.module.css"
import CardJob from "../CardJob/CardJob"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function JobList() {
	const [jobs, setJobs] = useState([])

	const [countJob, setCountJob] = useState(0)

	const [page, setPage] = useState(0)

	const maxNumPage = countJob / 9

	function handlePage(newPage) {
		if (newPage < 0) {
			return
		}
		if (newPage >= maxNumPage) {
			return
		}
		setPage(newPage)
	}

	const queryInput = useSelector((state) => state.search.queryInput)

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setPage(0)
	}, [queryInput])

	useEffect(() => {
		setLoading(true)

		fetch(`http://localhost:3001/jobs?title=${queryInput}&offset=${page * 9}`)
			.then((response) => response.json())
			.then((data) => {
				setJobs(data.rows)
				setCountJob(data.count)
			})
			.catch((error) => console.log("Error al obtener los trabajos", error))
			.finally(() => setLoading(false))
	}, [queryInput, page])

	return (
		<div className={style.container}>
			{!loading ? (
				<div className={style.containerCards}>
					{jobs.map((job) => (
						<CardJob key={job.id} job={job} />
					))}
				</div>
			) : (
				<div className={style.containerLoading}>
					<p>Loading jobs...</p>
				</div>
			)}

			<div className={style.containerPages}>
				<button onClick={() => handlePage(page - 1)}>Prev</button>
				<p>
					Showing {page * 9}-{page * 9 + jobs.length} of {countJob}
				</p>
				<button onClick={() => handlePage(page + 1)}>Next</button>
			</div>
		</div>
	)
}
