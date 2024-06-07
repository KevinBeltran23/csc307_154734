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

    const todoBoxes = [];
    const totalBoxes = 11;
    const spacing = 75 / (totalBoxes + 1); // Calculate spacing based on total number of boxes

    for (let i = 1; i <= totalBoxes; i++) {
        const topValueBoxes = 20 + spacing * i + "%"; // Calculate the top value dynamically
        const topValueButtons = 20.75 + spacing * i + "%"; // Calculate the top value dynamically
        const todo = props.items[i - 1]; // Get the corresponding todo item for the box

        todoBoxes.push(
            <div key={i} className={`todo-box todo-box-${i}`} style={{ top: topValueBoxes }}>
                {todo && (
                    <div className="todo-item">
                        {todoEditing === todo._id ? (
                            <>
                                <input
                                    type="text"
                                    onChange={(e) => setEditingText(e.target.value)}
                                    value={editingText}
                                />
                                <button onClick={() => editItem(todo._id)}>Submit Edits</button>
                                <button onClick={() => setTodoEditing(null)}>Cancel</button>
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
                        <button onClick={() => props.deleteItem(todo._id)}>Delete</button>
                        <input
                            type="checkbox"
                            onChange={() => toggleCheck(todo._id)}
                            checked={todo.checked}
                        />
                    </div>
                )}
            </div>
        );

        todoBoxes.push(
            <div key={`button-${i}`} className={`todo-button todo-button-${i}`} style={{ top: topValueButtons }}></div>
        );
    }

    var create_lst = [
        { value: "Create", label: "Create" },
        { value: "Event", label: "Event" },
        { value: "Class", label: "Class" },
        { value: "Calendar", label: "Calendar" },
        { value: "To Do Item", label: "To Do Item" }
    ];

    var cal_lst = [
        { value: "Create", label: "Calendars" },
        { value: "Option 2", label: "Option 2" },
        { value: "Option 3", label: "Option 3" }
    ];

    var todo_lst = [
        { value: "Create", label: "To Do" },
        { value: "Option 2", label: "Option 2" },
        { value: "Option 3", label: "Option 3" }
    ];

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
    function handleCreate() {
        // create an event
    }
    function handleCalendarsDropdown() {
        // open calendars drop down
    }
    function handleToDoDropdown() {
        // open todo dropdown
    }
    function handleClickingOnEvent() {
        // implement functionality
    }

    function updateItems(event, newItem) {
        event.preventDefault();

        props
            .postItem(newItem)
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
            user: props.userId
        };

        props
            .putItem(itemId, updatedItem)
            .then((updatedItemResponseJson) => {
                props.setItems(
                    props.items.map((item) => (item._id === itemId ? updatedItemResponseJson : item))
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
                        .map((item) => (item._id === itemId ? updatedItemResponseJson : item))
                        .sort((a, b) => new Date(a.duedate) - new Date(b.duedate))
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
                const sortedItems = json.todo_list.sort((a, b) => new Date(a.duedate) - new Date(b.duedate));
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
                Log Out{" "}
            </button>
            <div className="calendar-dropdown-container">
                <div className="dropdown-rectangle">
                    <div className="dropdown-button-frame">
                        <div className="calendar-todo-dropdown">{Dropdown(props, cal_lst)}</div>
                    </div>
                </div>
            </div>
            <div className="todo-dropdown-container">
                <div className="dropdown-rectangle">
                    <div className="dropdown-button-frame">
                        <div className="calendar-todo-dropdown">{Dropdown(props, todo_lst)}</div>
                    </div>
                </div>
            </div>

            <div className="currentDay">{format(activeDate, "MMMM dd yyyy")}</div>

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

            <div className="main-rect"></div>
            {todoBoxes}

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

            {message && <p>{message}</p>}
        </>
    );
}

export default ToDo;