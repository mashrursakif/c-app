import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const setState = (state: any, payload: any) => {
  Object.keys(payload).map((k) => {
    state[k] = payload[k];
  });
};

export default store;
