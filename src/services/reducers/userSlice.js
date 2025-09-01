import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    userInfo: {
      username: "",
      email: "",
      password: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.loggedIn = true;
      state.userInfo = action.payload;
    },
    logOutUser: (state) => {
      state.loggedIn = false;
      state.userInfo = {
        username: "",
        email: "",
        password: "",
      };
    },
  },
});

export const { setUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
