import React from "react"
import style from "./createJobForm.module.css"

export default function CreateJobForm() {
	return (
		<div className={style.mainContainer}>
			<div className={style.formContainer}>
				<h1>Create a New Job</h1>
				<form>
					<label htmlFor="jobTitle" id="jobTitle" name="jobTitle" required>
						Job title{" "}
					</label>
					<input type="text" id="jobTitle" name="jobTitle" />
					<label
						htmlFor="jobDescription"
						id="jobDescription"
						name="jobDescription"
						required
					>
						Job description
					</label>
					<input type="text" id="jobDescription" name="jobDescription" />

					<label
						htmlFor="jobCategory"
						id="jobCategory"
						name="jobCategory"
						required
					></label>

					<label htmlFor="jobSkills" id="jobSkills" name="jobSkills" required>
						Necessary skills{" "}
					</label>
					<input type="text" id="jobSkills" name="jobSkills" />
					<select id="jobCategory" name="jobCategory" required>
						<option value="">Select category</option>
						<option value="development">Development</option>
						<option value="designer">Designer</option>
						<option value="marketing">Marketing</option>
					</select>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	)
}
