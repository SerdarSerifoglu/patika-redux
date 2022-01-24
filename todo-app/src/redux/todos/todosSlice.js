import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return await res.json();
});

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data);
    return res.data;
})

export const toggleTodoAsync = createAsyncThunk("todos/toggleTodoAsync", async ({id, data}) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
    return res.data;
})

const initialState = {
    items: [],
    isLoading: false,
    error: null,
    activeFilter : "all",
    addNewTodoLoading: false,
    addNewTodoError: null
};

//redux toolkit createSlice içerisinde immerJs kütüphanesini kullanarak state'i klonlamaya gerek kalmadan düzenleme yapmamızı sağlar.
const todosSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        // toggle: (state, action) => {
        //     const { id } = action.payload;
        //     const item = state.items.find((item) => item.id === id);
        //     item.completed = !item.completed;
        // },
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
    },
    extraReducers: {
        //get todos
        [getTodosAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
        //add todo
        [addTodoAsync.pending]: (state, action) => {
            state.addNewTodoLoading = true;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            state.addNewTodoLoading = false;
        },
        [addTodoAsync.rejected]: (state, action) => {
            state.addNewTodoLoading = false;
            state.error = action.error.message;
        },
        //toggle todo
        [toggleTodoAsync.fulfilled]: (state, action) => {
            const { id, completed } = action.payload;
            const index = state.items.findIndex((item) => {return item.id === id});
            state.items[index].completed = completed;
            console.log(action.payload);
        }
    }
})

export const selectTodos = (state) => state.todos.items;
export const filteredTodos = (state) => {
    if(state.todos.activeFilter == "all"){
       return state.todos.items;
    }
    return state.todos.items.filter((todo) => state.todos.activeFilter == "active" 
        ? todo.completed == false 
        : todo.completed == true);
}
export const { toggle, deleteTodo, changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;