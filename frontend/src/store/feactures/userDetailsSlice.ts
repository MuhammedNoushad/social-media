import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUserState from "../../types/IUserState";

const initialState: IUserState = {
  id: "",
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  bio: "",
  dob: "",
  phone: undefined,
  isBlock: false,
  isAdmin: false,
};

const userDetailsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserState>) {
      Object.assign(state, action.payload);
    },
    clearState() {
      return initialState;
    },
  },
});

export const { setUser, clearState } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
