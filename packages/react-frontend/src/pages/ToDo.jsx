import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/ToDo.css";
import Clock from "./Clock.jsx";

function ToDo(props) {
    const [item, setItem] = useState({
        duedate: "",
        contents: "",
        user: props.userId
    });

    const [items, setItems] = useState([]);
    const [message, setMessage] = useState(""); // Add message state for displaying feedback
    const navigate = useNavigate();
    const [todoEditing, setTodoEditing] = useState(null);
    const [editingText, setEditingText] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setItem((prevItem) => ({
            ...prevItem,
            [name]: value
        }));
    }

    function handleWeekly() {
        // go to weekly page
        navigate("/weekly");
    }

    function handleMonthly() {
        // go to weekly page
        navigate("/monthly");
    }

    function fetchItems() {
        const promise = fetch(
            `http://localhost:8000/todo?user=${props.userId}`,
            {
                method: "GET",
                headers: props.addAuthHeader()
            }
        );
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
                    setMessage("Item created successfully");
                    return response.json(); // Return the JSON response for chaining
                } else {
                    setMessage(
                        `Post Error ${response.status}: ${response.statusText}`
                    );
                    throw new Error(
                        `Post Error ${response.status}: ${response.statusText}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`Post Error: ${error.message}`);
                throw error;
            });
        return promise;
    }

    function deleteItem(_id) {
        const promise = fetch(`http://localhost:8000/todo/${_id}`, {
            method: "DELETE",
            headers: props.addAuthHeader({
                "Content-Type": "application/json"
            })
        })
            .then((response) => {
                if (response.status === 204) {
                    // Filter out the item with the specified _id and update the items list
                    const updated = items.filter((item) => item._id !== _id);
                    setItems(updated);
                } else if (response.status === 404) {
                    console.log("Resource not found.");
                } else {
                    throw new Error(
                        "Failed to delete item. Status code: " + response.status
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
        return promise;
    }

    function putItem(itemId, updatedItem) {
        const promise = fetch(`http://localhost:8000/todo/${itemId}`, {
            method: "PUT",
            headers: props.addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(updatedItem)
        })
            .then((response) => {
                if (response.status === 200) {
                    setMessage("Item updated successfully");
                    return response.json(); // Return the JSON response for chaining
                } else {
                    setMessage(
                        `PUT Error ${response.status}: ${response.statusText}`
                    );
                    throw new Error(
                        `PUT Error ${response.status}: ${response.statusText}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`PUT Error: ${error.message}`);
                throw error;
            });
        return promise;
    }

    function updateItems(event) {
        event.preventDefault(); // Prevent form submission from causing a page reload

        const newItem = {
            ...item,
            user: props.userId // Set the user ID from props
        };

        postItem(newItem)
            .then((newItemResponseJson) => {
                setItems((prevItems) => [...prevItems, newItemResponseJson]);
                setItem({ duedate: "", contents: "", user: props.userId });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function editItem(itemId) {
        const updatedItem = {
            ...items.find((item) => item._id === itemId),
            contents: editingText,
            user: props.userId // Ensure the user ID is included
        };

        putItem(itemId, updatedItem) // Pass itemId and updatedItem separately
            .then((updatedItemResponseJson) => {
                setItems(
                    items.map((item) =>
                        item._id === itemId ? updatedItemResponseJson : item
                    )
                );
                setTodoEditing(null);
                setEditingText("");
            })
            .catch((error) => {
                setMessage(`Update Error: ${error.message}`);
                console.log(error);
            });
    }

    useEffect(() => {
        fetchItems()
            .then((res) => res.json())
            .then((json) => setItems(json.todo_list))
            .catch((error) => {
                console.log(error);
                setMessage(`Fetch Error: ${error.message}`);
            });
    }, []);

    return (
        <>
            <button className="logout" onClick={props.logout}>
                {" "}
                Log Out Temporary Button{" "}
            </button>
            <div className="page">
                <div className="todo-main-container">
                    <div className="todo-clock">
                        <Clock />
                    </div>
                    <div className="todo-header-name"> To Dos </div>
                    <button
                        className="todo-weekly-view-frame"
                        onClick={handleWeekly}
                    >
                        <span className="todo-change-view">Weekly View</span>
                    </button>
                    <button
                        className="todo-monthly-view-frame"
                        onClick={handleMonthly}
                    >
                        <span className="todo-change-view">Monthly View</span>
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
                                    <button type="submit">Add Todo</button>
                                </div>
                            </form>
                        </div>

                        {items && items.length > 0 ? (
                            items.map((todo) => (
                                <div key={todo._id}>
                                    {todoEditing === todo._id ? (
                                        <>
                                            <input
                                                type="text"
                                                onChange={(e) =>
                                                    setEditingText(
                                                        e.target.value
                                                    )
                                                }
                                                value={editingText}
                                            />
                                            <button
                                                onClick={() =>
                                                    editItem(todo._id)
                                                }
                                            >
                                                Submit Edits
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setTodoEditing(null)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div>{todo.contents}</div>
                                            <button
                                                onClick={() => {
                                                    setTodoEditing(todo._id);
                                                    setEditingText(
                                                        todo.contents
                                                    );
                                                }}
                                            >
                                                Edit Todo
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => deleteItem(todo._id)}
                                    >
                                        Delete
                                    </button>
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            console.log(
                                                "Toggle complete functionality not implemented yet"
                                            )
                                        }
                                        checked={todo.completed}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No items available</p>
                        )}
                    </div>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </>
    );
}

export default ToDo;
