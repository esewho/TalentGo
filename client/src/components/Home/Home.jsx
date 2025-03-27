import React from "react"
import JobList from "../JobList/JobList"
import style from "./home.module.css"
import { Outlet } from "react-router-dom"

export default function Home() {
	return (
		<div className={style.defaultContainer}>
			<section>
				<div className={style.container}>
					<JobList />
					<Outlet />
				</div>
			</section>
		</div>
	)
}
