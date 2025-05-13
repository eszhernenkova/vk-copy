import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user.slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';


export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector