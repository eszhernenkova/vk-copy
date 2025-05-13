
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'


interface UserState {
	email: string | null
	error: string | null
	loading: boolean
}

const initialState: UserState ={
	email: null,
	error: null,
	loading: false
};

export const register = createAsyncThunk<
  string, //  возвращаем email
  { email: string; password: string },
  { rejectValue: string } // для корректной типизации reject
>("user/register", async ({ email, password }, thunkAPI) => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user.email!;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Неизвестная ошибка при регистрации");
  }
});

// export const register = createAsyncThunk(
// 	'user/register',
// 	async({email, password}: {email: string, password: string}, thunkAPI)=> {
// 		try {
// 			const auth = getAuth()
// 			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
// 			return userCredential.user.email
// 		} catch (error) {
// 			if(error instanceof Error){
// 				return thunkAPI.rejectWithValue(error.message)
// 			}
// 		}
// 	}
// )

export const login = createAsyncThunk<
  string, // что возвращает (email)
  { email: string; password: string }, // что принимает
  { rejectValue: string } // что возвращает в случае reject
>(
  'user/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user.email!;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Неизвестная ошибка при входе");
    }
  }
);

// export const login = createAsyncThunk(
// 	'user/login',
// 	async({email, password}: {email: string, password: string}, thunkAPI)=> {
// 		try {
// 			const auth = getAuth()
// 			const userCredential = await signInWithEmailAndPassword(auth, email, password)
// 			return userCredential.user.email
// 		} catch (error) {
// 			if(error instanceof Error){
// 				return thunkAPI.rejectWithValue(error.message)
// 			}
// 		}
// 	}
// )

export const logout = createAsyncThunk('user/logout', async () => {
	const auth = getAuth()
	await signOut(auth)
  })

export const userSlice = createSlice({
    name: 'user',
    initialState,
	reducers: {
		clearError: (state) => {
			state.error = null
		 }
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
	extraReducers: (builder) => {
	builder
		.addCase(register.pending, (state, action) => {
			if(!action.payload) return;
			state.loading = true
			state.error = null
		})
		.addCase(register.fulfilled, (state, action: PayloadAction<string | null>) => {
			state.email = action.payload
			state.loading = false
		})
		.addCase(register.rejected, (state, action) => {
			state.error = action.payload ?? "Ошибка регистрации";
			state.loading = false;
		})
		.addCase(login.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(login.fulfilled, (state, action) => {
			state.email = action.payload;
			state.loading = false;
		})
		.addCase(login.rejected, (state, action) => {
			state.error = action.payload ?? "Ошибка авторизации";
			state.loading = false;
		})
		.addCase(logout.fulfilled, (state) => {
			state.email = null;
			state.error = null;
			state.loading = false;
		});
	}
})

export const { clearError } = userSlice.actions
export default userSlice.reducer