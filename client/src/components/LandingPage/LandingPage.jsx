import React from "react"
import { useNavigate } from "react-router-dom"
import style from "./landingPage.module.css"

const LandingPage = () => {
	const navigate = useNavigate()
	return (
		<div>
			<div className={style.landingContainer}>
				<div className={style.landingContent}>
					<h1>¡Bienvenido/a a TalentGo!</h1>
					<p>Encuentre su trabajo ideal con nuestra plataforma</p>
					<button
						className={style.buttonLanding}
						onClick={() => navigate("/home")}
					>
						Ingresar
					</button>
				</div>
			</div>
		</div>
	)
}

export default LandingPage
