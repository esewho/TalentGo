import { Route, Routes, useNavigate } from "react-router-dom"
import "./App.css"
import LandingPage from "./components/LandingPage/LandingPage"
import { useEffect } from "react"
import LayoutApp from "./layout/LayoutApp"
import Home from "./components/Home/Home"
import JobDetail from "./components/jobDetail/JobDetail"
import CreateJobForm from "./components/createJobForm/createJobForm"

function App() {
	const navigate = useNavigate()
	useEffect(() => {
		navigate("/landing")
	}, [])

	return (
		<Routes>
			<Route path="/home" element={<LayoutApp />}>
				<Route path="/home" element={<Home />}>
					<Route path="/home/:jobId" element={<JobDetail />} />
				</Route>
			</Route>
			<Route path="/createJob" element={<CreateJobForm />}></Route>

			<Route path="/landing" element={<LandingPage />} />
		</Routes>
	)
}

export default App
