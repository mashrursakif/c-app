import { createSlice } from '@reduxjs/toolkit';
import { RootState, setState } from '../store';

interface InitState {
	id: string;
	[index: string]: unknown;
}

const initialState: InitState = {
	id: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			setState(state, payload);
		},
	},
});

export const getUserState = (state: RootState, prop: string) => {
	return state.user[prop];
};

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
