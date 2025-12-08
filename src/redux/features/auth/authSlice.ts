import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoginResponse, User } from './authTypes';
import UserStorage from '../../../shared/utils/userStorage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthReady: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthReady: false, // will become true once store rehydrates
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<Pick<LoginResponse, 'data' | 'token'>>
    ) => {
      state.user = action.payload.data;
      state.token = action.payload.token;
      state.isAuthReady = true;
    },
    setLogout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthReady = false;
      UserStorage.clear();
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
