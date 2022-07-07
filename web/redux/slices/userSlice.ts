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
    setId: (state, { payload }) => {
      state.id = payload;
    },
  },
});

export const getUser = (state: RootState) => {
  return state.user;
};

export const { setId } = userSlice.actions;

export default userSlice.reducer;
