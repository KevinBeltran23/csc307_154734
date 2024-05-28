import React, { useEffect, useState } from "react";
import "../components/ToDo.css";

import "../components/ToDo.css";
import Clock from "./Clock.jsx"

function ToDo(props) {

    /* stuff I am replacing or revamping below

    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");
    const [todoEditing, setTodoEditing] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        const temp = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(temp);

        if (loadedTodos) {
            setTodos(loadedTodos);
        }
    }, []);

    useEffect(() => {
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
    function handleToDo() {
        // go to todo page
        navigate('/todo');
    }

    */ //stuff I am replacing or revamping above

    // kevin doing stuff below

    const [item, setItem] = useState({
        duedate: "",
        contents: "",
        user: ""
    });

    const [items, setItems] = useState([]);
    const [message, setMessage] = useState(""); // Add message state for displaying feedback

    function handleChange(event) {
        const { name, value} = event.target;
        switch (name) {
          case "duedate":
            setItem({ ...item, duedate: value });
            break;
          case "contents":
            setItem({ ...item, contents: value });
            break;
          case "user":
            setItem({ ...item, user: value});
        }
      }

    function fetchItems() {
        const promise = fetch("http://localhost:8000/todo", {
            method: "GET",
            headers: props.addAuthHeader(),
            });
        return promise;
    }

    function postItem(item) {
        const promise = fetch("http://localhost:8000/todo", {
        method: "POST",
        headers: props.addAuthHeader({
            "Content-Type": "application/json"
          }),
        body: JSON.stringify(item)
        })
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
            setMessage(`Item created successfuly`);
            } else {
            setMessage( `Post Error ${response.status}: ${response.data}`);
            }
        })
        .catch((error) => {
            setMessage(`Post Error: ${error}`);
        });
        return promise;
    }

    function deleteItem(_id) {
        fetch(`http://localhost:8000/todo/${_id}`, {
            method: "DELETE",
            headers: props.addAuthHeader({
                "Content-Type": "application/json"
            }),
        })
        .then((response) => {
            if (response.status === 204) {
                // Filter out the item with the specified _id and update the items list
                const updated = items.filter((item) => item._id !== _id);
                setItems(updated);
            } else if (response.status === 404) {
                console.log("Resource not found.");
            } else {
                throw new Error("Failed to delete item. Status code: " + response.status);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    function updateItems(event) {
        event.preventDefault();
        postItem(item)
            .then((newItem) => {
                if (newItem) {
                    setItems((prevItems) => [...prevItems, newItem]);
                    setItem({ duedate: "", contents: "", user: "" }); // Clear form after submission
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchItems()
            .then((res) => {
                console.log('Fetch response:', res);
                return res.status === 200 ? res.json() : undefined;
            })
            .then((json) => {
                console.log('JSON response:', json);
                if (json && json.todo_list) { // Check if todo_list exists
                    console.log('Todos:', json.todo_list);
                    setItems(json.todo_list); // Set items to todo_list
                    console.log('Items state after setting:', json.todo_list);
                } else {
                    setItems([]);
                    console.log('No todos found');
                }
            })
            .catch((error) => {
                console.log('Fetch error:', error);
            });
    }, []);

    useEffect(() => {
        console.log('Items state changed:', items);
    }, []);

    
    // Kevin doing stuff above

    function handleWeekly() {
        // go to weekly page
        navigate('/weekly');
    }
    function handleMonthly() {
        // go to weekly page
        navigate('/monthly');
    }

    return (
        
        <div className="page">
            <div className='todo-clock'>
                <Clock />
            </div>

            <h1> To Dos </h1>
             
            <button className='todo-weekly-view-frame' onClick={handleWeekly}>
                <span className='todo-change-view'>Weekly View</span>
            </button> 

            <button className='todo-monthly-view-frame' onClick={handleMonthly}>
                <span className='todo-change-view'>Monthly View</span>
            </button>

            <div className="ToDo">
            
                <div className="entry">
                    <form onSubmit={updateItems}>
                        <div className="textEntry">
                            <input
                                type="text"
                                name="contents"
                                onChange={handleChange}
                                value={item.contents}
                                style={{ fontSize: "18px" }}
                                placeholder="Contents"
                            />
                            <input
                                type="text"
                                name="duedate"
                                onChange={handleChange}
                                value={item.duedate}
                                placeholder="Due date"
                            />
                            <input
                                type="text"
                                name="user"
                                onChange={handleChange}
                                value={item.user}
                                placeholder="User"
                            />
                            <button type="submit">Add Todo</button>
                        </div>
                    </form>
                </div>
    
                {items && items.length > 0 ? (
                    items.map((todo) => {
                        console.log('Rendering todo:', todo); // Log each todo being rendered
                        return (
                            <div key={todo._id}>
                                <div>{todo.contents}</div>
                                <button onClick={() => deleteItem(todo._id)}>
                                    Delete
                                </button>
                                <input
                                    type="checkbox"
                                    onChange={() => console.log("Toggle complete functionality not implemented yet")}
                                    checked={todo.completed}
                                />
                                <button onClick={() => console.log("Edit functionality not implemented yet")}>
                                    Edit Todo
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p>No items available</p>
                )}
            </div>
            {message && <p>{message}</p>}
        </div>
        
    );
}
export default ToDo;
