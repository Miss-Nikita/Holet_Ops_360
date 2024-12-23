import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn,
};
const userSlices = createSlice({
  name: user,
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});


export const { login , logout } = userSlices.actions;
export default userSlices.reducer;