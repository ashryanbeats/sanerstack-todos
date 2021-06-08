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


    return (
        <div>
            Todos list
            {todos.map((todo, i) => {
                return <Todo key={i} todo={todo} />
            })}
        </div>
    )
}


export default Todos;