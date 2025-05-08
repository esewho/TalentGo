import SavedJobsList from "../savedJobsList/SavedJobsList"
import JobDetail from "../jobDetail/JobDetail"
import style from "./savedJobs.module.css"
import { Outlet } from "react-router-dom"

export default function SavedJobs() {
	return (
		<div className={style.defaultContainer_savedJobs}>
			<section className={style.section_savedJobs}>
				<section className={style.container_savedJobs}>
					<SavedJobsList />
					<Outlet />
				</section>
			</section>
		</div>
	)
}
