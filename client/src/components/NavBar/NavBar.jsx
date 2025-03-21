import React from "react"

import { useDispatch, useSelector } from "react-redux"
import style from "./navBar.module.css"
import { Link } from "react-router-dom"
import { setQueryInput } from "../../features/searchSlice"

export default function NavBar() {
	const dispatch = useDispatch()
	const queryInput = useSelector((state) => state.search.queryInput)

	function handleChange(event) {
		const value = event.target.value
		dispatch(setQueryInput(value))
	}
	return (
		<nav className={style.containerNav}>
			<div className={style.navItems}>
				<div>
					<p className={style.pLogo}>TALENTGO</p>
				</div>
				<div className={style.input}>
					<input
						value={queryInput}
						onChange={handleChange}
						type="text"
						placeholder="Buscar trabajo..."
					/>
					<button>
						<svg width="48" height="48" viewBox="0 0 16 16">
							<path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 11.5zM5 7a2 2 0 1 1 4 0a2 2 0 0 1-4 0m2-3a3 3 0 1 0 1.738 5.445l2.408 2.409a.5.5 0 0 0 .708-.708L9.445 8.738A3 3 0 0 0 7 4" />
						</svg>
					</button>
				</div>
				<div className={style.containerIcons}>
					<Link to="/createJobs">
						<svg width="32" height="32" viewBox="0 0 24 24">
							<path
								fill="#666666"
								d="M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m2-8H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"
							/>
						</svg>
					</Link>
					<Link to="/savedJobs">
						<svg width="32" height="32" viewBox="0 0 24 24">
							<path fill="#666666" d="M4 22V6h12v16l-6-3zm14-4V4H7V2h13v16z" />
						</svg>
					</Link>
					<Link to="/Applied Jobs">
						<svg width="32" height="32" viewBox="0 0 24 24">
							<path
								fill="#666666"
								d="m19.65 20.35l.7-.7l-1.85-1.85V15h-1v3.2zM10 6h4V4h-4zm8 17q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23M4 21q-.825 0-1.412-.587T2 19V8q0-.825.588-1.412T4 6h4V4q0-.825.588-1.412T10 2h4q.825 0 1.413.588T16 4v2h4q.825 0 1.413.588T22 8v4.275q-.875-.625-1.9-.95T18 11q-2.9 0-4.95 2.05T11 18q0 .775.163 1.538T11.675 21z"
							/>
						</svg>
					</Link>
					<Link to="/home">
						<svg width="32" height="32" viewBox="0 0 24 24">
							<path fill="#666666" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
						</svg>
					</Link>
				</div>
			</div>
		</nav>
	)
}
