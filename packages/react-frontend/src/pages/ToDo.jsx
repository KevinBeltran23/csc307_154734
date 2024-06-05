import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/ToDo.css";
import Clock from "./Clock.jsx";

function ToDo(props) {
    const [item, setItem] = useState({
        duedate: "",
        contents: "",
        checked: false,
        user: props.userId
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState(""); // Add message state for displaying feedback
    const [todoEditing, setTodoEditing] = useState(null);
    const [editingText, setEditingText] = useState("");

    function handleChange(event) {
        var { name, value } = event.target;
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

    function updateItems(event, newItem) {
        event.preventDefault(); // Prevent form submission from causing a page reload

        props.postItem(newItem)
            .then((newItemResponseJson) => {
                props.setItems((prevItems) => [...prevItems, newItemResponseJson]);
                setItem({
                    duedate: "",
                    contents: "",
                    checked: false,
                    user: props.userId
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function editItem(itemId) {
        const updatedItem = {
            ...props.items.find((item) => item._id === itemId),
            contents: editingText,
            user: props.userId // Ensure the user ID is included
        };

        props.putItem(itemId, updatedItem) // Pass itemId and updatedItem separately
            .then((updatedItemResponseJson) => {
                props.setItems(
                    props.items.map((item) =>
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

    function toggleCheck(itemId) {
        const itemToUpdate = props.items.find((item) => item._id === itemId);
        const updatedItem = {
            ...itemToUpdate,
            checked: !itemToUpdate.checked,
            user: props.userId // Ensure the user ID is included
        };

        putItem(itemId, updatedItem) // Pass itemId and updatedItem separately
            .then((updatedItemResponseJson) => {
                props.setItems(
                    props.items
                        .map((item) =>
                            item._id === itemId ? updatedItemResponseJson : item
                        )
                        .sort(
                            (a, b) => new Date(a.duedate) - new Date(b.duedate)
                        )
                );
            })
            .catch((error) => {
                setMessage(`Update Error: ${error.message}`);
                console.log(error);
            });
    }

    useEffect(() => {
        props.fetchItems()
            .then((res) => res.json())
            .then((json) => {
                const sortedItems = json.todo_list.sort(
                    (a, b) => new Date(a.duedate) - new Date(b.duedate)
                );
                props.setItems(sortedItems);
            })
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
            <div className="todo-clock">
                <Clock />
            </div>
            <div className="todo-header-name"> To Dos </div>
            <button className="todo-weekly-view-frame" onClick={handleWeekly}>
                <span className="todo-change-view">Weekly View</span>
            </button>
            <button className="todo-monthly-view-frame" onClick={handleMonthly}>
                <span className="todo-change-view">Monthly View</span>
            </button>

            <div className="ToDo">
                <div className="entry">
                    <form onSubmit={(event) => updateItems(event, item)}>
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
                                type="date"
                                name="duedate"
                                onChange={handleChange}
                                value={item.duedate}
                                placeholder="Due date"
                            />
                            <button type="submit">Add Todo</button>
                        </div>
                    </form>
                </div>

                {props.items && props.items.length > 0 ? (
                    props.items.map((todo) => (
                        <div key={todo._id}>
                            {todoEditing === todo._id ? (
                                <>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setEditingText(e.target.value)
                                        }
                                        value={editingText}
                                    />
                                    <button onClick={() => editItem(todo._id)}>
                                        Submit Edits
                                    </button>
                                    <button
                                        onClick={() => setTodoEditing(null)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* this displays the contents and the date to the screen*/}
                                    <div>{todo.contents}</div>
                                    <div>{todo.duedate}</div>

                                    <button
                                        onClick={() => {
                                            setTodoEditing(todo._id);
                                            setEditingText(todo.contents);
                                        }}
                                    >
                                        Edit Todo
                                    </button>
                                </>
                            )}
                            <button onClick={() => props.deleteItem(todo._id)}>
                                Delete
                            </button>

                            <input
                                type="checkbox"
                                onChange={() => toggleCheck(todo._id)}
                                checked={todo.checked}
                            />
                        </div>
                    ))
                ) : (
                    <p>No items available</p>
                )}
            </div>
            {message && <p>{message}</p>}
        </>
    );
}

export default ToDo;