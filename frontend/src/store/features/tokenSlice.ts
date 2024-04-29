import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  token: string;
}

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: "",
  } as TokenState,
  reducers: {
    addToken: (state: TokenState, action: PayloadAction<string>) => {
      if (action.payload) {
        console.log(action.payload, "action.payload");
        return { ...state, token: action.payload };
      }
    },
    clearToken: (state: TokenState) => {
      state.token = "";
    },
  },
});

export const { addToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;