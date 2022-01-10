import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../redux/todos/todosSlice";

const TodoList = () => {
    const dispatch = useDispatch();

    const items = useSelector(state => state.todos.items);

    const checkboxClick = (itemId) => {
        dispatch(toggle({id: itemId}));
    }

    return (
        <ul className="todo-list">
        {
            items.map((item) => (
                <li key={item.id} className={item.completed ? "completed" : ""}>
                    <div className="view">
                        <input className="toggle" type="checkbox" checked={item.completed} onChange={(e) => checkboxClick(item.id)}/>
                        <label>{item.title}</label>
                        <button className="destroy"></button>
                    </div>
                </li>
            ))
        }
    </ul>
    )
}

export default TodoList;