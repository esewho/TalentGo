import React from "react"
import NavBar from "../components/NavBar/NavBar"
import { Outlet } from "react-router-dom"

import style from "./layoutApp.module.css"
import CreateJobForm from "../components/createJobForm/createJobForm"

export default function LayoutApp() {
	return (
		<div className={style.layoutApp}>
			<NavBar />
			
	

			<Outlet />
		</div>
	)
}
