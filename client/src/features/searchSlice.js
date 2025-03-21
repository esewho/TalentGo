import { createSlice } from "@reduxjs/toolkit"

const searchSlice = createSlice({
	name: "Search",
	initialState: {
		queryInput: "",
	},
	reducers: {
		setQueryInput: (state, action) => {
			state.queryInput = action.payload
		},
	},
})

export const { setQueryInput } = searchSlice.actions
export default searchSlice.reducer
