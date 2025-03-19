import React from "react"
import style from "./cardJob.module.css"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

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
			style={isSelected ? { backgroundColor: "#f8f8f8" } : {}}
		>
			<div className={style.card}>
				<img src={job.company_logo} alt={job.company} className={style.logo} />

				<div className={style.cardContent}>
					<h3
						style={
							isSelected
								? { color: "blue", textDecorationLine: "underline" }
								: {}
						}
					>
						{job.title}
					</h3>
					<h5>{job.company_name}</h5>
					<h5>{job.candidate_required_location}</h5>
				</div>
			</div>
		</article>
	)
}
