import { useState, useEffect } from "react";
import Todo from "./Todo";


function Todos() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("http://localhost:8000/api/v1/todos");
            const data = await res.json();
            setTodos(data);
        }

        fetchData();
    }, []);

    function createTodo(e) {
        e.preventDefault();

        const raw = { text: `Made on ${Date.now()}`, completed: false };
        const headers = {
            'Content-Type': 'application/json'
        };

        async function postData() {
            const options = { headers, method: "POST", body: JSON.stringify(raw) };
            const res = await fetch("http://localhost:8000/api/v1/todos", options);
            const data = await res.json();
            setTodos([...todos, raw]);
        }

        postData();
    }


    return (
        <div>
            Todos list
            <button onClick={createTodo}>Create a todo</button>
            {todos.map((todo, i) => {
                return <Todo key={i} todo={todo} />
            })}
        </div>
    )
}


export default Todos;