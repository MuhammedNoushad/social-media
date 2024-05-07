import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUserState from "../../types/IUserState";

const initialState: IUserState[] = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUsers(_, action: PayloadAction<IUserState[]>) {
      return action.payload;
    },
    clearState() {
      return initialState;
    },
  },
});

export const { setAllUsers, clearState } = usersSlice.actions;
export default usersSlice.reducer;
