import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveFilter, clearCompleted, selectTodos } from "../redux/todos/todosSlice";

const ContentFooter = () => {
	const dispatch = useDispatch();
	const items = useSelector(selectTodos);
	const itemLeft = items.filter((item) => !item.completed).length;

	const activeFilter = useSelector((state) => state.todos.activeFilter);

    return (
        <footer className="footer">

		{/* This should be `0 items left` by default */}
		<span className="todo-count">
			<strong>{itemLeft}</strong>
			item{itemLeft > 1 && "s"} left
		</span>

		<ul className="filters">
			<li>
				<a className={activeFilter === "all" ? "selected": ""} onClick={() => { dispatch(changeActiveFilter("all"))}}>All</a>
			</li>
			<li>
				<a className={activeFilter === "active" ? "selected": ""} onClick={() => { dispatch(changeActiveFilter("active"))}}>Active</a>
			</li>
			<li>
				<a className={activeFilter === "completed" ? "selected": ""} onClick={() => { dispatch(changeActiveFilter("completed"))}}>Completed</a>
			</li>
		</ul>

		{/* Hidden if no completed items are left */}
		<button className="clear-completed" onClick={() => dispatch(clearCompleted())}>
			Clear completed
		</button>
	</footer>

    )
}

export default ContentFooter;