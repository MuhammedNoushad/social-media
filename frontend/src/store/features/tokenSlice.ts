import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  token: string;
  role: string;
}

const initialState: TokenState = {
  token: "",
  role: "", // Initialize role as empty string
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addToken: (
      state: TokenState,
      action: PayloadAction<{ token: string; role: string }>
    ) => {
      // Check if payload exists and is not empty
      if (action.payload.token && action.payload.role) {
        return {
          ...state,
          token: action.payload.token,
          role: action.payload.role,
        };
      } else {
        // If payload is empty or undefined, return current state
        return state;
      }
    },
    clearToken: (state: TokenState) => {
      return { ...state, token: "", role: "" };
    },
  },
});

export const { addToken , clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
