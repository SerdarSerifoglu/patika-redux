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

//redux toolkit createSlice içerisinde immerJs kütüphanesini kullanarak state'i klonlamaya gerek kalmadan düzenleme yapmamızı sağlar.
const todosSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        addTodo: (state, action) => {
            state.items.push(action.payload);
        },
        toggle: (state, action) => {
            const { id } = action.payload;
            const item = state.items.find((item) => item.id === id);
            item.completed = !item.completed;
        }
    }
})

export const { addTodo, toggle } = todosSlice.actions;
export default todosSlice.reducer;