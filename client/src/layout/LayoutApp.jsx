import React from "react"
import NavBar from "../components/NavBar/NavBar"
import { Outlet } from "react-router-dom"
import style from "./layoutApp.module.css"

export default function LayoutApp() {
	return (
		<div className={style.layoutApp}>
			<NavBar />
			<Outlet />
		</div>
	)
}
