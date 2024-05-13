import React from "react";

function ToDo() {
    const [todos, setTodos] = React.useState([])
    const [todo, setTodo] = React.useState("")

    return(
            <div className = "ToDo">
                <form>
                    <input type = "text" />
                    <button type = "submit">Add Todo</button>
                </form>
            </div>
    );
}

export default ToDo;