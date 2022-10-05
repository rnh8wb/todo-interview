import { useEffect, useState } from 'react';
import { ApiClient, ToDo } from './ApiClient';
import './App.css';

const apiClient = new ApiClient(false);

function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [label, setLabel] = useState('');

  useEffect(() => {
    apiClient
      .getToDos()
      .then((fetchedTodos) => setTodos(fetchedTodos))
      .catch(console.error);
  }, [setTodos]);

  function addTodoItem() {
    // Update local storage with new item
    apiClient.addTodo(label).then((newTodo) => {
      // Update components state with new item
      setTodos([...todos, newTodo]);
    });
  }

  function markTodoItemDone(todoId: string) {
    // Update local storage with new `done` state of todo item
    apiClient.toggleDone(todoId).then((updatedTodo) => {
      if (updatedTodo) {
        const updatedTodos = [...todos];
        // Find the updated item in the component's state
        const updated = updatedTodos.find((todo) => todo.id === updatedTodo.id);
        if (updated) {
          // Update the item's done state
          updated.done = !updated.done;
        }
        // Update component's state with updated item's new state
        setTodos([...updatedTodos]);
      }
    });
  }

  return (
    <>
      <h1>To Do List</h1>

      <div className="add-todo-container">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Buy groceries"
        />
        <button onClick={addTodoItem}>Add ToDo</button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <label
            style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
          >
            {todo.label}
          </label>
          <button onClick={() => markTodoItemDone(todo.id)}>
            Mark {todo.done ? 'Undone' : 'Done'}
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
