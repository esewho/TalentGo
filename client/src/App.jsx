import { Route, Routes, useNavigate } from "react-router-dom"
import "./App.css"
import LandingPage from "./components/LandingPage/LandingPage"
import { useEffect } from "react"
import LayoutApp from "./layout/LayoutApp"
import { getAnonId } from "../utils/anonId"
import Home from "./components/Home/Home"
import JobDetail from "./components/jobDetail/JobDetail"
import CreateJobForm from "./components/createJobForm/createJobForm"
import SavedJobs from "./components/SavedJobs/savedJobs"

function App() {
	const navigate = useNavigate()
	useEffect(() => {
		navigate("/landing")
	}, [])

	useEffect(() => {
		const annonId = getAnonId()

		fetch(`http://localhost:3001/users/${annonId}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		})
	}, [])

	return (
		<Routes>
			<Route path="/home" element={<LayoutApp />}>
				<Route path="createJobs" element={<CreateJobForm />}></Route>
				<Route path="savedJobs" element={<SavedJobs />}>
					<Route path=":jobId" element={<JobDetail />} />
				</Route>
				<Route path="" element={<Home />}>
					<Route path=":jobId" element={<JobDetail />} />
				</Route>
			</Route>

			<Route path="/landing" element={<LandingPage />} />
		</Routes>
	)
}

export default App
