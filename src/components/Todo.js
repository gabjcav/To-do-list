import React from "react";

const Todo = ({todo, text, todos, setTodos }) => {

    //Events
    const deleteHandler = () => {
        setTodos(todos.filter(e => e.id !== todo.id))
    };

    const completeHandler = () => {
        setTodos(todos.map((i) => {
            if(i.id === todo.id){
                return{
                    ...i, completed: !i.completed
                }
            }
            return i; 
        }))
    };

    return(
        <div className="todo">
            <li className={`todo-i ${todo.completed ? "completed" : ''}`}>{text}</li>
            <button onClick={completeHandler} className="complete-btn">
                <i className="fas fa-check"></i>
            </button>
            <button onClick={deleteHandler} className="trash-btn">
                <i className="fas fa-trash-alt"></i>
            </button> 
        </div>
    )
}

export default Todo; 