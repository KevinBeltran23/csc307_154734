import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(_id) {
        fetch(`http://localhost:8000/users/${_id}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.status === 204) {
                    setCharacters(characters.filter(character => character._id !== _id)); // Corrected to use _id
                } else if (response.status === 404) {
                    console.log("User not found.");
                } else {
                    console.log("Failed to delete user.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    function updateList(person) {
        postUser(person)
            .then((response) => {
                if (response.status === 201) {
                    return response.json();
                } else {
                    console.log("Failed to add user.");
                }
            })
            .then((json) => {
                // Ensure that the response includes the ID
                if (json && json._id) {
                    setCharacters([...characters, json]);
                } else {
                    console.log("Failed to get ID for the added user.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }



    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
    }, []);

    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;