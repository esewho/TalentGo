import style from "./jobFilter.module.css"

export default function JobFilter({
	onFilterChange,
	categories,
	filters,
	setFilters,
	location,
}) {
	const handleChange = (e) => {
		const { name, value } = e.target
		const newFilters = { ...filters, [name]: value }
		setFilters(newFilters)
		onFilterChange(newFilters)
	}

	return (
		<div className={style.customSelect}>
			<div className={style.select}>
				<select
					name="category"
					id="category"
					value={filters.category}
					onChange={handleChange}
				>
					<option value="">All categories</option>
					{categories.map((category) => (
						<option value={category.name} key={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div className={style.select}>
				<select
					name="location"
					id="location"
					value={filters.location}
					onChange={handleChange}
				>
					<option value="">All locations</option>

					{Array.isArray(location) &&
						location.map((loc) => (
							<option value={loc.candidate_required_location} key={loc.id}>
								{loc.candidate_required_location}
							</option>
						))}
				</select>
			</div>
		</div>
	)
}
