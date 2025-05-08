import { v4 as UUIDV4 } from "uuid"

export const getAnonId = () => {
	let anonId = localStorage.getItem("anonId")
	if (!anonId) {
		anonId = UUIDV4()
		localStorage.setItem("anonId", anonId)
	}
	return anonId
}
