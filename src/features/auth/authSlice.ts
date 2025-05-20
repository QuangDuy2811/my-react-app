import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  email: string | null;
}

// Lấy dữ liệu từ localStorage để khôi phục trạng thái khi reload
const initialState: AuthState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  email: localStorage.getItem("email"),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ email: string }>) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;

      // Lưu trạng thái vào localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", action.payload.email);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = null;

      // Xóa khỏi localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("email");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
