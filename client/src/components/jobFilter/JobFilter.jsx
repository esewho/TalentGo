import React, { useState } from "react"
import style from "./jobFilter.module.css"

export default function JobFilter({ onFilterChange }) {
	const [filters, setFilters] = useState({
		salary: "",
		location: "",
		tags: "",
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		const newFilters = { ...filters, [name]: value }
		setFilters(newFilters)
		onFilterChange(newFilters)
	}
	return (
		<div className={style.filterContainer}>
			<div>
				<select
					name="salary"
					id="salary"
					value={filters.salary}
					onChange={handleChange}
				>
					<option value="">All salaries</option>
					<option value="0$ - 1500$">0$ - 1500$</option>
					<option value="1500$ - 3000$">1500$ - 3000$</option>
					<option value="3000$ - 4500$">3000$ - 4500$</option>
					<option value="+5000$">+5000$</option>
				</select>
			</div>
		</div>
	)
}
