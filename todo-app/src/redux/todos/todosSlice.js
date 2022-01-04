import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: []
    },
    reducers: {
    } 
});

export const { someAction } = todosSlice.actions;
export default todosSlice.reducer;