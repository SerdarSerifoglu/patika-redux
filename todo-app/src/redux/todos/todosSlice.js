import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [
        {
            id: "1",
            title: "Test 1"
        },
        {
            id: "2",
            title: "Test 2"
        }
    ]
};

const todosSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {

    }
})

export default todosSlice.reducer;