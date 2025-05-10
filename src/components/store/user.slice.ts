import { createSlice } from "@reduxjs/toolkit";

const initialState ={};

export const userSlice = createSlice({
    name: 'user',
    initialState,
	reducers: {
		// logout: (state) => {
		// 	state.jwt = null;
		// },
		// clearLoginError: (state) => {
		// 	state.loginErrorMessage = undefined;
		// },
		// clearRegisterError: (state) => {
		// 	state.registerErrorMessage = undefined;
		// }

	},
})
