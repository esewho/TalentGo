import React from "react"

import { useDispatch, useSelector } from "react-redux"
import style from "./navBar.module.css"
import { Link } from "react-router-dom"
import { setQueryInput } from "../../features/searchSlice"
import { useNavigate } from "react-router-dom"

export default function NavBar() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const queryInput = useSelector((state) => state.search.queryInput)

	function handleChange(event) {
		const value = event.target.value
		dispatch(setQueryInput(value))
	}
	return (
		<nav className={style.containerNav}>
			<div className={style.navItems}>
				<div>
					<button
						onClick={() => navigate("/home")}
						style={{ background: "none", border: "none" }}
					>
						<p className={style.pLogo}>TALENTGO</p>
					</button>
				</div>
				<div className={style.input}>
					<input
						value={queryInput}
						onChange={handleChange}
						type="text"
						placeholder="Search jobs..."
					/>
					<button>
						<svg width="48" height="48" viewBox="0 0 16 16">
							<path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 11.5zM5 7a2 2 0 1 1 4 0a2 2 0 0 1-4 0m2-3a3 3 0 1 0 1.738 5.445l2.408 2.409a.5.5 0 0 0 .708-.708L9.445 8.738A3 3 0 0 0 7 4" />
						</svg>
					</button>
				</div>
				<div className={style.containerIcons}>
					<button onClick={() => navigate("/home/createJobs")}>
						<svg width="32" height="32" viewBox="0 0 24 24">
							<path
								fill="#666666"
								d="M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m2-8H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"
							/>
						</svg>
					</button>
					<button onClick={() => navigate("/home/savedJobs")}>
						<svg width="32" height="32" viewBox="0 0 24 24">
							<path fill="#666666" d="M4 22V6h12v16l-6-3zm14-4V4H7V2h13v16z" />
						</svg>
					</button>
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
