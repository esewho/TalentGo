import React, { useEffect, useState, useRef } from "react"
import style from "./jobDetail.module.css"
import { useParams, useLocation } from "react-router-dom"
import { getAnnonId } from "../../../utils/annonId"
import toast from "react-hot-toast"

const splitSkills = (jobTags = []) => {
	if (!Array.isArray(jobTags)) {
		jobTags = []
	}
	if (jobTags.length < 3) {
		return `${jobTags.slice(0, 2).join(", ")}`
	}
	return `${jobTags.slice(0, 2).join(", ")} and ${jobTags.slice(2).length} more`
}

const splitLocations = (locationString = "") => {
	const locations = locationString.split(", ").map((loc) => loc.trim())
	if (locations.length <= 3) return locations.join(", ")

	return `${locations.slice(0, 3).join(", ")} and ${locations.length - 3} more`
}

const jobTypeToString = (jobType) => {
	if (jobType == "full_time") return "Full Time "
	else if (jobType == "contract") return "Contract"
	else if (jobType == "freelance") return "Freelance"
	else return jobType
}

export default function JobDetail() {
	const [open, setOpen] = useState(false)
	const [job, setJob] = useState(null)
	const [openLocations, setOpenLocations] = useState(false)
	const { jobId } = useParams()
	const jobDetailRef = useRef(null)

	const handlerApplyJob = () => {
		window.open(`${job.url}`, "_blank")
	}

	const handleSave = async () => {
		const annonId = getAnnonId()
		try {
			const res = await fetch(
				`http://172.20.10.3:3001/users/${annonId}/savedJobs/${jobId}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ jobId: jobId }),
				}
			)
			if (!res.ok) throw new Error("Failed to save")
			if (res.ok) {
				toast.success("Saved successfully!")
			}
		} catch (error) {
			console.error("Error saving the job", error)
		}
	}

	const location = useLocation()

	const { companyName } = location.state || {}

	const fetchJobDetail = async () => {
		const annonId = getAnnonId()
		const response = await fetch(
			`http://172.20.10.3:3001/jobs/${jobId}?annonId=${annonId}`
		).then((data) => data.json())
		setJob(response)
		console.log(response)
	}
	useEffect(() => {
		fetchJobDetail()
	}, [jobId])

	useEffect(() => {
		if (jobDetailRef.current)
			jobDetailRef.current.scrollTo({ top: 0, behavior: "smooth" })
	}, [jobId])

	if (!job) return null

	return (
		<div className={style.jobDetail} ref={jobDetailRef}>
			<div className={style.conditions}>
				<div className={style.containerLogo}>
					<img src={job.company_logo} alt="company_logo" />
					<p>{companyName}</p>
				</div>
				<h1>{job.title}</h1>

				<div className={style.auxContainer}>
					<div className={style.containerLogo}>
						<svg width="24" height="24" viewBox="0 0 551 717">
							<path
								fill="#666666"
								d="M83 0L28 56h496L469 0zm468 276H0V83h551zm-165-55v-55H166v55h27v-28h165v28zm165 276H0V304h551zm-165-55v-56H166v56h27v-28h165v28zm165 275H0V525h551zm-165-55v-55H166v55h27v-28h165v28z"
							/>
						</svg>
						<p>{job.category}</p>
					</div>
					<div className={style.containerLogo}>
						<svg width="24" height="24" viewBox="0 0 24 24">
							<g
								fill="none"
								stroke="#666666"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
							>
								<path d="M8 21H6a3 3 0 0 1-3-3v-1h5.5M17 8.5V5a2 2 0 1 1 2 2h-2" />
								<path d="M19 3H8a3 3 0 0 0-3 3v11M9 7h4m-4 4h4m5.42 1.61a2.1 2.1 0 0 1 2.97 2.97L15 22h-3v-3z" />
							</g>
						</svg>
						<p>{jobTypeToString(job.job_type)}</p>
					</div>

					{job.salary && (
						<div className={style.containerLogo}>
							<svg width="24" height="24" viewBox="0 0 24 24">
								<g fill="#65a30d" fill-rule="evenodd" clip-rule="evenodd">
									<path
										d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
										opacity=".5"
									/>
									<path d="M12 5.25a.75.75 0 0 1 .75.75v.317c1.63.292 3 1.517 3 3.183a.75.75 0 0 1-1.5 0c0-.678-.564-1.397-1.5-1.653v3.47c1.63.292 3 1.517 3 3.183s-1.37 2.891-3 3.183V18a.75.75 0 0 1-1.5 0v-.317c-1.63-.292-3-1.517-3-3.183a.75.75 0 0 1 1.5 0c0 .678.564 1.397 1.5 1.652v-3.469c-1.63-.292-3-1.517-3-3.183s1.37-2.891 3-3.183V6a.75.75 0 0 1 .75-.75m-.75 2.597c-.936.256-1.5.975-1.5 1.653s.564 1.397 1.5 1.652zm3 6.653c0-.678-.564-1.397-1.5-1.652v3.304c.936-.255 1.5-.974 1.5-1.652" />
								</g>
							</svg>
							<p style={{ color: "black" }}>{job.salary}</p>
						</div>
					)}

					<div className={style.containerLogo} style={{ position: "relative" }}>
						<svg width="24" height="24" viewBox="0 0 48 48">
							<g fill="none" stroke="#666666">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="4.667"
									d="M19.036 44q-1.47-4.793-4.435-7.147c-2.965-2.353-7.676-.89-9.416-3.318s1.219-6.892 2.257-9.526s-3.98-3.565-3.394-4.313q.585-.748 7.609-4.316Q13.652 4 26.398 4C39.144 4 44 14.806 44 21.68c0 6.872-5.88 14.276-14.256 15.873q-1.123 1.636 3.24 6.447"
								/>
								<path
									fill="#666666"
									fill-rule="evenodd"
									stroke-linejoin="round"
									stroke-width="4"
									d="M19.5 14.5q-.981 3.801.583 5.339q1.563 1.537 5.328 2.01q-.855 4.903 2.083 4.6q2.937-.302 3.53-2.44q4.59 1.29 4.976-2.16c.385-3.45-1.475-6.201-2.238-6.201s-2.738-.093-2.738-1.148s-2.308-1.65-4.391-1.65s-.83-1.405-3.69-.85q-2.86.555-3.443 2.5Z"
									clip-rule="evenodd"
								/>
								<path
									stroke-linecap="round"
									stroke-width="4"
									d="M30.5 25.5c-1.017.631-2.412 1.68-3 2.5c-1.469 2.05-2.66 3.298-2.92 4.608"
								/>
							</g>
						</svg>
						<p
							onClick={() => setOpen(true)}
							style={{
								cursor: "pointer",
								textDecorationLine: "underline",
							}}
						>
							Skills: {splitSkills(job.tags)}
						</p>
						{open && (
							<div className={style.containerSkills}>
								{open && (
									<div className={style.listItems}>
										{/* Verifica si job.tags es un array antes de intentar hacer .map() */}
										{Array.isArray(job.tags) && job.tags.length > 0 ? (
											job.tags.map((tag, index) => (
												<p>
													<li key={index}>{tag}</li>
												</p>
											))
										) : (
											<p>No skills available</p> // O cualquier mensaje alternativo si no hay tags
										)}
									</div>
								)}

								<div
									onClick={() => setOpen(false)}
									style={{
										position: "fixed",
										top: 0,
										left: 0,
										width: "100%",
										height: "100%",
										zIndex: 10,
									}}
								/>
							</div>
						)}
					</div>

					<div className={style.containerLogo}>
						<svg width="24" height="24" viewBox="0 0 26 26">
							<path
								fill="#666666"
								d="M19 0c-2.209 0-4 1.793-4 4c0 2.665 3.5 6.306 3.5 9.969h1C19.501 10.306 23 6.77 23 4c0-2.207-1.791-4-4-4m0 1.938a2.063 2.063 0 1 1-.002 4.126A2.063 2.063 0 0 1 19 1.937zM13 2C6.383 2 1 7.383 1 14s5.383 12 12 12s12-5.383 12-12c0-2.01-.498-3.896-1.375-5.563c-.133.264-.267.515-.406.782c-.263.508-.54 1.021-.782 1.531c.25.715.422 1.471.5 2.25h-1.312c-.072.335-.125.65-.125.969V15h1.438a9.9 9.9 0 0 1-1.282 4H18.72c.22-.938.347-1.975.437-3.031h-1.97a19 19 0 0 1-.53 3.031H9.343a19.2 19.2 0 0 1-.594-4h7.75v-1.031a4.7 4.7 0 0 0-.125-.969H8.75a19.2 19.2 0 0 1 .594-4h5.344a31 31 0 0 1-.97-2h-3.687c.827-1.887 1.92-3 2.969-3c0-.695.125-1.348.344-1.969C13.229 2.027 13.116 2 13 2M8.875 4.906a12.4 12.4 0 0 0-1 2.094h-2a10 10 0 0 1 3-2.094M4.344 9H7.28a21.4 21.4 0 0 0-.531 4H3.062a9.9 9.9 0 0 1 1.282-4m-1.282 6H6.75c.059 1.425.243 2.77.531 4H4.344a9.9 9.9 0 0 1-1.282-4m2.813 6h2c.288.776.625 1.473 1 2.094a10 10 0 0 1-3-2.094m4.156 0h5.938c-.827 1.887-1.92 3-2.969 3s-2.143-1.113-2.969-3m8.094 0h2a10 10 0 0 1-3 2.094c.375-.62.712-1.317 1-2.094"
							/>
						</svg>
						<div className={style.listLocation + style.scrollbarCustom}>
							<p
								onClick={() => setOpenLocations(true)}
								style={{
									cursor: "pointer",
									textDecorationLine: "underline",
								}}
							>
								{splitLocations(job.candidate_required_location)}
							</p>

							{openLocations && (
								<div className={style.containerLocations}>
									{job.candidate_required_location ? (
										(() => {
											const locations = job.candidate_required_location
												.split(", ")
												.map((loc) => loc.trim())

											const grouped = []
											for (let i = 0; i < locations.length; i += 4) {
												grouped.push(locations.slice(i, i + 4))
											}

											return grouped.map((group, groupIndex) => (
												<div
													key={groupIndex}
													// style={{
													// 	display: "flex",
													// 	gap: "8px",
													// 	marginBottom: "6px",
													// 	flexWrap: "wrap",
													// }}
												>
													{group.map((loc, i) => (
														<p key={i} className={style.locationItem}>
															{loc}
														</p>
													))}
												</div>
											))
										})()
									) : (
										<p>No locations available</p>
									)}

									<div
										onClick={() => setOpenLocations(false)}
										style={{
											position: "fixed",
											top: 0,
											left: 0,
											width: "100%",
											height: "100%",
											zIndex: 10,
										}}
									/>
								</div>
							)}
						</div>
						{/* {() => {
									const locations = job.candidate_required_location
										.split(", ")
										.map((loc) => loc.trim())
								}} */}

						{/* {job.candidate_required_location
								.split(", ")
								.map((location, index) => (
									<p key={index}>{location}</p> // ✅ Aquí sí se retorna correctamente
								))}
						</div> */}
					</div>
				</div>
				<div className={style.containerButtons}>
					<button onClick={handlerApplyJob} className={style.buttonApply}>
						Apply for job
					</button>
					<button onClick={handleSave} className={style.buttonSave}>
						Save
					</button>
				</div>
			</div>
			<div
				dangerouslySetInnerHTML={{
					__html: job.description,
				}}
			/>
		</div>
	)
}
