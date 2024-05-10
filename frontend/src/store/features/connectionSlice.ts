import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import IConnection, { IConnectionState } from '../../types/IConnection';

const initialState : IConnectionState = {
    connection:[]
}

const connectionSlice = createSlice({
    name: "connection",
    initialState,
    reducers: {
        setConnection(state, action: PayloadAction<IConnection[]>) {
            state.connection = action.payload
        },
        clearConnection(state) {
            state.connection = [];
        }
    }
})

export const { setConnection , clearConnection } = connectionSlice.actions
export default connectionSlice.reducer