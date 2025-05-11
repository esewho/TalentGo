import React from "react"
import style from "./savedJobList.module.css"
import CardJob from "../CardJob/CardJob"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { getAnnonId } from "../../../utils/annonId"

export default function SavedJobList() {
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

	const annonId = getAnnonId()

	useEffect(() => {
		setPage(0)
	}, [queryInput])

	useEffect(() => {
		setLoading(true)
		fetch(`http://localhost:3001/users/${annonId}/savedJobs?offset=${page * 9}`)
			.then((response) => response.json())
			.then((data) => {
				setJobs(data.rows || [])
				console.log(data)
				setCountJob(data.count || 0)
			})
			.catch((error) =>
				console.log("Error al obtener los trabajos guardados", error)
			)
			.finally(() => setLoading(false))
	}, [page, annonId])
	console.log(annonId)

	return (
		<div className={style.container}>
			{!loading ? (
				<div className={style.containerCards}>
					{Array.isArray(jobs) && jobs.length > 0 ? (
						jobs.map((job) => (
							<CardJob key={job.id} job={job} pathNavigate="home/savedJobs" />
						))
					) : (
						<p>No saved jobs found.</p>
					)}
				</div>
			) : (
				<div className={style.containerLoading}>
					<p>Loading...</p>
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
