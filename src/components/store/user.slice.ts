import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth'

// interface UserState {
// 	email: string | null
// 	error: string | null
// 	loading: boolean
// }

const initialState ={
	// email: null,
	// error: null,
	// loading: false
};

// export const register =createAsyncThunk()

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
