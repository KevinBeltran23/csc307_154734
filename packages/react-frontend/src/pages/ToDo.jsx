import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/ToDo.css";
import Clock from "./Clock.jsx";
import Dropdown from "./Dropdown";
import { format } from "date-fns";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function ToDo(props) {
    const [activeDate, setActiveDate] = useState(new Date());

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

    function editItem(itemId) {
        const updatedItem = {
            ...props.items.find((item) => item._id === itemId),
            contents: editingText,
            user: props.userId
        };

        props
            .putItem(itemId, updatedItem)
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
            user: props.userId
        };

        props
            .putItem(itemId, updatedItem)
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

    function updateItems(event, newItem) {
        event.preventDefault();

        props
            .postItem(newItem)
            .then((newItemResponseJson) => {
                props.setItems((prevItems) => [
                    ...prevItems,
                    newItemResponseJson
                ]);
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
        props
            .fetchItems()
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

    var create_lst = [
        { value: "Create", label: "Create" },
        { value: "Event", label: "Event" },
        { value: "Class", label: "Class" },
        { value: "Calendar", label: "Calendar" },
        { value: "To Do Item", label: "To Do Item" }
    ];

    var cal_lst = [{ value: "Default", label: "Calendars" }];

    var todo_lst = [{ value: "Default", label: "To Do" }];

    function handleSettings() {
        navigate("/settings");
    }
    function handleWeekly() {
        navigate("/weekly");
    }
    function handleMonthly() {
        navigate("/monthly");
    }
    function handleToDo() {
        navigate("/todo");
    }

    var names = props.calendars;
    for (var i = 0; i < names.length; i++) {
        cal_lst.push({ value: names[i].name, label: names[i].name });
    }

    var todos = props.items;
    for (var i = 0; i < todos.length; i++) {
        todo_lst.push({ value: todos[i].contents, label: todos[i].contents });
    }

    var events = props.events;
    for (var i = 0; i < events.length; i++) {
        console.log(events[i].title);
    }
    return (
        <>
            <button className="logout" onClick={props.logout}>
                {" "}
                Log Out{" "}
            </button>
            <div className="calendar-dropdown-container">
                <div className="dropdown-rectangle">
                    <div className="dropdown-button-frame">
                        <div className="calendar-todo-dropdown">
                            {Dropdown(props, cal_lst)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="todo-dropdown-container">
                <div className="dropdown-rectangle">
                    <div className="dropdown-button-frame">
                        <div className="calendar-todo-dropdown">
                            {Dropdown(props, todo_lst)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="currentDay">
                {format(activeDate, "MMMM dd yyyy")}
            </div>

            <AiOutlineLeft className="TodoNavIcon TodoNavIcon-left" />
            <AiOutlineRight className="TodoNavIcon TodoNavIcon-right" />

            <div className="the-clock">
                <Clock />
            </div>
            <div className="create-dropdown">{Dropdown(props, create_lst)}</div>
            <button className="change-view-frame" onClick={handleWeekly}>
                <span className="change-view">Weekly View</span>
            </button>
            <button className="todo-view-frame" onClick={handleMonthly}>
                <span className="change-view">Monthly View</span>
            </button>
            <button className="settings-frame" onClick={handleSettings}>
                <span className="gear"></span>
            </button>
            <button className="download-frame">
                <span className="download-icon"></span>
            </button>

            <div className="main-rect">
                <div className="todo-entry">
                    <form onSubmit={(event) => updateItems(event, item)}>
                        <input
                            type="text"
                            name="contents"
                            onChange={handleChange}
                            value={item.contents}
                            className="contents-input"
                            placeholder="Contents"
                        />
                        <input
                            type="date"
                            name="duedate"
                            onChange={handleChange}
                            value={item.duedate}
                            className="duedate-input"
                            placeholder="Due date"
                        />
                        <button type="submit" className="add-todo-button">
                            Add Todo
                        </button>
                    </form>
                </div>

                {props.items.map((todo) => (
                    <div key={todo._id} className="todo-box">
                        <div className="todo-item">
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
                    </div>
                ))}
            </div>
            {message && <p>{message}</p>}
        </>
    );
}

export default ToDo;
