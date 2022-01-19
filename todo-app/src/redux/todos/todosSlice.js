import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () => {
    const res = await fetch("http://localhost:7000/todos");
    return await res.json();
});

const initialState = {
    items: [],
    isLoading: false,
    error: null,
    activeFilter : "all",
};

//redux toolkit createSlice içerisinde immerJs kütüphanesini kullanarak state'i klonlamaya gerek kalmadan düzenleme yapmamızı sağlar.
const todosSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.items.push(action.payload);
            },
            //prepare: reducerdan hemen önce çalışan bir hook nanoid değeri componentte basılıyordu buraya taşımamızı sağladı. 
            prepare: ({ title }) => {
                return {
                    payload: {
                        id: nanoid(),
                        completed: false,
                        title: title,
                    }
                }
            }
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
    },
    extraReducers: {
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
export const { addTodo, toggle, deleteTodo, changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;