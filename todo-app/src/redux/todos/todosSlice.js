import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: []
    },
    reducers: {

    }
})

export default todosSlice.reducer;