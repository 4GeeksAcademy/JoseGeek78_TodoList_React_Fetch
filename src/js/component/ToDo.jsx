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

    const markAsCompleted = (elm) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === elm.id ? { ...todo, done: true } : todo
        );

        fetch('https://playground.4geeks.com/apis/fake/todos/user/JoseGeek78', {
            method: "PUT",
            body: JSON.stringify(updatedTodos),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(() => setTodos(updatedTodos))
            .catch(error => console.error(error));
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

    const deleteCompleted = () => {
        const updatedTodos = todos.filter((todo) => !todo.done);

        fetch('https://playground.4geeks.com/apis/fake/todos/user/JoseGeek78', {
            method: "PUT",
            body: JSON.stringify(updatedTodos),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(() => setTodos(updatedTodos))
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
            <button onClick={deleteAll} style={{ backgroundColor: 'green', color: '#fff' }}>Borrar</button>
            <button onClick={deleteCompleted}>Eliminar Completadas</button>
            <h1 className="d-flex justify-content-center">Tareas</h1>
            <div className="todo">
                <input placeholder="Añadir Tarea..." onKeyDown={(e) => insertTodo(e)} />
                {todos.map((todo) => (
                    <TodoElement key={todo.id} text={todo.label} click={() => markAsCompleted(todo)} />
                ))}
            </div>
        </>
    );
};

export default ToDo;
