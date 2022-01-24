import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, filteredTodos, getTodosAsync, toggleTodoAsync } from "../redux/todos/todosSlice";


const TodoList = () => {
    const dispatch = useDispatch();

    const filteredTodoList = useSelector(filteredTodos);
    const isLoading = useSelector((state) => state.todos.isLoading);

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch])

    function deleteClick(itemId){
        if(window.confirm("Emin misin?")){
            dispatch(deleteTodo(itemId));
        }
    }

    const handleToggle = async (id, completed) => {
        await dispatch(toggleTodoAsync({id,data:{completed}}))
    }

    if(isLoading){
        return <div>Loading...</div>
    }
    return (
        <ul className="todo-list">
        {
            filteredTodoList.map((item) => (
                <li key={item.id} className={item.completed ? "completed" : ""}>
                    <div className="view">
                        <input className="toggle" type="checkbox" checked={item.completed} onChange={(e) => handleToggle(item.id, !item.completed)}/>
                        <label>{item.title}</label>
                        <button className="destroy" onClick={() => { deleteClick(item.id) }}></button>
                    </div>
                </li>
            ))
        }
    </ul>
    )
}

export default TodoList;