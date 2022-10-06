import { useEffect, useState } from 'react';
import { ApiClient, ToDo } from './ApiClient';
import { Modal } from './components/Modal/Modal';
import { ToDoList } from './components/ToDoList/ToDoList';
import { arrayMoveImmutable } from 'array-move';
import './App.css';

const apiClient = new ApiClient(true);

function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [label, setLabel] = useState('');
  const [displaySpinner, setDisplaySpinner] = useState(false);

  useEffect(() => {
    apiClient
      .getToDos()
      .then((fetchedTodos) => setTodos(fetchedTodos))
      .catch(console.error);
  }, [setTodos]);

  function addTodoItem() {
    setDisplaySpinner(true);
    // Update local storage with new item
    apiClient.addTodo(label).then((newTodo) => {
      // Update components state with new item
      setTodos([...todos, newTodo]);
      setDisplaySpinner(false);
    });
  }

  function markTodoItemDone(todoId: string) {
    setDisplaySpinner(true);
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
        setDisplaySpinner(false);
      }
    });
  }

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setTodos((prevItem) => arrayMoveImmutable(prevItem, oldIndex, newIndex));
  };

  return (
    <>
      {displaySpinner && <Modal />}
      <h1>To Do List</h1>

      <div className="add-todo-container">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Buy groceries"
        />
        <button onClick={addTodoItem}>Add ToDo</button>
      </div>
      <ToDoList
        todos={todos}
        onSortEnd={onSortEnd}
        markTodoItemDoneHandler={markTodoItemDone}
      />
    </>
  );
}

export default App;
