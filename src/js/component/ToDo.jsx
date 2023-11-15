import React, { useState, useEffect } from "react";
import TodoElement from "./home";

const ToDo = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/JoseGeek78')
            .then(response => {
                if (!response.ok) {
                    console.error("Insert task to create user on API");
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(responseAsJson => {
                setTodos(responseAsJson);
            });
    }, []);

    const deleteTodo = (elm) => {
        if (todos.length === 1) {
            fetch('https://playground.4geeks.com/apis/fake/todos/user/JoseGeek78', {
                method: "PUT",
                body: JSON.stringify([]),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(() => setTodos([]))
                .catch(error => console.error(error));
        }

        if (todos.length > 1) {
            fetch('https://playground.4geeks.com/apis/fake/todos/user/JoseGeek78', {
                method: "PUT",
                body: JSON.stringify(todos.filter(itm => itm.id !== elm.id)),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(() => setTodos(todos.filter(itm => itm.id !== elm.id)))
                .catch(error => console.error(error));
        }
    };

    const deleteAll = () => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/JoseGeek78', {
            method: "PUT",
            body: JSON.stringify([]),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(() => setTodos([]))
            .catch(error => console.error(error));
    };

    const insertTodo = (text) => {
        if (text.key === "Enter" && text.target.value !== "") {
            const newTodo = { label: text.target.value, id: text.target.value + todos.length, done: false };

            fetch('https://playground.4geeks.com/apis/fake/todos/user/JoseGeek78', {
                method: "PUT",
                body: JSON.stringify([...todos, newTodo]),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(() => {
                    setTodos([...todos, newTodo]);
                    text.target.value = "";
                })
                .catch(error => console.error(error));
        }
    };

    return (
        <>
            <button onClick={deleteAll}>Borrar</button>
            <h1 className="d-flex justify-content-center">Tareas</h1>
            <div className="todo">
                <input placeholder="Añadir Tarea..." onKeyDown={(e) => insertTodo(e)} />
                {todos.map((todo) => (
                    <TodoElement key={todo.id} text={todo.label} click={() => deleteTodo(todo)} />
                ))}
            </div>
        </>
    );
};

export default ToDo;
