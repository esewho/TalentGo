import React from "react"
import style from "./cardJob.module.css"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

const translateDate = (date) => {
	const currentDate = new Date()
	const postedDate = new Date(date)

	const differenceInTime = currentDate - postedDate
	const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24))

	return differenceInDays == 0
		? "Published today"
		: differenceInDays == 1
		? "Published 1 day ago"
		: `Published ${differenceInDays} days ago`
}

export default function CardJob({ job }) {
	const { jobId: selectedJobId } = useParams()

	const navigate = useNavigate()

	function handlerJobDetail() {
		navigate(`/home/${job.id}`, { state: { companyName: job.company_name } })
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
				<img src={job.company_logo} alt={job.company} className={style.logo} />

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
					<h5>{job.candidate_required_location}</h5>
				</div>
				<div className={style.dateJob}>
					<p>{translateDate(job.publication_date)}</p>
				</div>
			</div>
		</article>
	)
}
