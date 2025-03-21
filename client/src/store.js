import { configureStore } from "@reduxjs/toolkit"

import searchReducer from "./features/searchSlice.js"

export const store = configureStore({
	reducer: {
		search: searchReducer,
	},
})

export default { store }
