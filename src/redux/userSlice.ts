import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "currentUser",
  initialState: {
    username: "",
    photoURL: "",
    uid: "",
  },
  reducers: {
    addCurrentUser: (state, action) => {
      state.username = action.payload.username;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.uid;
    },
    reset: (state) => {
      state.username = "";
      state.photoURL = "";
      state.uid = "";
    },
  },
});
export const { addCurrentUser, reset } = userSlice.actions;
export default userSlice.reducer;
