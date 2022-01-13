import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [
        {
            id: "1",
            title: "Test 1",
            completed: false
        },
        {
            id: "2",
            title: "Test 2",
            completed: false
        }
    ],
    activeFilter : "all",

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
        },
        deleteTodo: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((item) => { return item.id != id });
        },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter((item) => item.completed == false);
            state.items = filtered
        }
    }
})

export const { addTodo, toggle, deleteTodo, changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;