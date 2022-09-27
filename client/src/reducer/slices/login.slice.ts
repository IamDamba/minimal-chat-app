import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface IInitialState {
  username: string;
  room: string;
}

// Define the initial state using that type
const initialState: IInitialState = {
  username: "",
  room: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    exitRoomReducer: (state) => {
      state.room = "";
      state.username = "";
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLoginReducer: (
      state,
      action: PayloadAction<{ username: string; room: string }>
    ) => {
      state.room = action.payload.room;
      state.username = action.payload.username;
    },
  },
});

export const { exitRoomReducer, setLoginReducer } = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLogin = (state: RootState) => {
  state.login.room;
  state.login.username;
};

export default loginSlice.reducer;
