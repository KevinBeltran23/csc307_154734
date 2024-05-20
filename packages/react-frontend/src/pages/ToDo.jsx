import React from "react";
import "../components/ToDo.css";


function ToDo() {
    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState("");
    const [todoEditing, setTodoEditing] = React.useState(null);
    const [editingText, setEditingText] = React.useState("");

    React.useEffect(() => {
        const temp = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(temp);

        if (loadedTodos) {
            setTodos(loadedTodos);
        }
    }, []);

    React.useEffect(() => {
        const temp = JSON.stringify(todos);
        localStorage.setItem("todos", temp);
    }, [todos]);

    function handleSubmit(e) {
        e.preventDefault();

        const newTodo = {
            id: new Date().getTime(),
            text: todo,
            completed: false
        };

        setTodos([...todos].concat(newTodo));
        setTodo("");
    }

    function deleteTodo(id) {
        const updatedTodos = [...todos].filter((todo) => todo.id !== id);

        setTodos(updatedTodos);
    }

    function toggleComplete(id) {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    function editTodo(id) {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.text = editingText;
            }
            return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
        setEditingText("");
    }

    return (
        <div className="page">
            <h1> Wednesday </h1>
            <div className="ToDo">
                <div className="entry">
                    <form onSubmit={handleSubmit}>
                        <div className="textEntry">
                            <input
                                type="text"
                                onChange={(e) => setTodo(e.target.value)}
                                value={todo}
                            />
                            <button type="submit">Add Todo</button>
                        </div>
                    </form>
                </div>

                {todos.map((todo) => (
                    <div key={todo.id}>
                        {todoEditing === todo.id ? (
                            <input
                                type="text"
                                onChange={(e) => setEditingText(e.target.value)}
                                value={editingText}
                            />
                        ) : (
                            <div>{todo.text}</div>
                        )}

                        <button onClick={() => deleteTodo(todo.id)}>
                            Delete
                        </button>
                        <input
                            type="checkbox"
                            onChange={() => toggleComplete(todo.id)}
                            checked={todo.completed}
                        />

                        {todoEditing === todo.id ? (
                            <button onClick={() => editTodo(todo.id)}>
                                Submit Edits
                            </button>
                        ) : (
                            <button onClick={() => setTodoEditing(todo.id)}>
                                Edit Todo
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ToDo;
