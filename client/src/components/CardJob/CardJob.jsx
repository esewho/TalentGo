import React from "react"
import style from "./cardJob.module.css"
import { useNavigate, useParams } from "react-router-dom"

const translateDate = (date) => {
	const currentDate = new Date()
	const postedDate = new Date(date)

	// Convertir ambas fechas a solo YYYY-MM-DD (ignorando horas)
	const currentDateString = currentDate.toISOString().split("T")[0]
	const postedDateString = postedDate.toISOString().split("T")[0]

	if (currentDateString === postedDateString) {
		return "Posted today" // Si es el mismo día
	}

	const differenceInTime = currentDate - postedDate
	const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24))

	return differenceInDays === 1
		? "Published 1 day ago"
		: `Published ${differenceInDays} days ago`
}

export default function CardJob({ job, pathNavigate = "home" }) {
	const { jobId: selectedJobId } = useParams()

	const navigate = useNavigate()

	function handlerJobDetail() {
		navigate(`/${pathNavigate}/${job.id}`, {
			state: { companyName: job.company_name },
		})
	}

	const isSelected = selectedJobId == job.id

	return (
		<article
			onClick={handlerJobDetail}
			style={
				isSelected
					? {
							backgroundColor: "var(--selected-bg)",
							borderLeft: "3px solid var(--primary-color)",
					  }
					: {}
			}
		>
			<div className={style.card}>
				{/* <img src={job.company_logo} alt={job.company} className={style.logo} /> */}

				{job.company_logo && job.company_logo.trim() !== "" ? (
					<img
						className={style.logo}
						src={job.company_logo}
						alt={job.company}
					/>
				) : (
					<svg width="48" height="48" viewBox="0 0 24 24">
						<path
							fill="#0284c7"
							d="M21 7h-6a1 1 0 0 0-1 1v3h-2V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1M8 6h2v2H8zM6 16H4v-2h2zm0-4H4v-2h2zm0-4H4V6h2zm4 8H8v-2h2zm0-4H8v-2h2zm9 4h-2v-2h2zm0-4h-2v-2h2z"
						/>
					</svg>
				)}

				<div className={style.cardContent}>
					<h3
						style={
							isSelected
								? {
										color: "var(--primary-color)",
										textDecorationLine: "underline",
								  }
								: {}
						}
					>
						{job.title}
					</h3>
					<h5>{job.company_name}</h5>
					<h5>
						{job.candidate_required_location.length > 30
							? job.candidate_required_location.slice(0, 20) + "..."
							: job.candidate_required_location}
					</h5>
				</div>
				<div className={style.dateJob}>
					<p>{translateDate(job.publication_date)}</p>
				</div>
			</div>
		</article>
	)
}
