import { createSlice } from "@reduxjs/toolkit";
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: "",
    user: {},
  },
  reducers: {
    addChat: (state, action) => {
      state.chatId = action.payload.chatId;
      state.user = action.payload.user;
    },
    reset: (state) => {
      state.chatId = "";
      state.user = {};
    },
  },
});
export const { addChat, reset } = chatSlice.actions;
export default chatSlice.reducer;
