import { v4 as UUIDV4 } from "uuid"

export const getAnnonId = () => {
	let annonId = localStorage.getItem("annonId")
	if (!annonId) {
		annonId = UUIDV4()
		localStorage.setItem("annonId", annonId)
	}
	return annonId
}
