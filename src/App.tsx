import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchTodos(); // Fetch todos initially and then periodically
    const interval = setInterval(fetchTodos, 5000); // Polling every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5007/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async () => {
    if (!input) return;
    try {
      const response = await axios.post('http://localhost:5007/todos', { todo: input });
      if (response.status === 201) {
        fetchTodos(); // Re-fetch todos to update the list after adding
        setInput('');
      }
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const deleteTodo = async (index) => {
    try {
      const response = await axios.delete(`http://localhost:5007/todos/${index}`);
      if (response.status === 200) {
        fetchTodos(); // Re-fetch todos to update the list after deletion
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <div>
      <input 
        placeholder="Enter the text"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
