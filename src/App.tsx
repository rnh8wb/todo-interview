import { useEffect, useState } from 'react';
import { ApiClient, ToDo } from './ApiClient';
import { Modal } from './components/Modal/Modal';
import { ToDoList } from './components/ToDoList/ToDoList';
import { arrayMoveImmutable } from 'array-move';
import './App.css';
import { AddToDo } from './components/AddTodo/AddTodo';
import { Header } from './components/Header/Header';

const apiClient = new ApiClient(true);

function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [label, setLabel] = useState('');

  // Manages the loading state
  const [loading, setLoading] = useState(false);

  // Fetch todo items on init
  useEffect(() => {
    apiClient
      .getToDos()
      .then((fetchedTodos) => setTodos(fetchedTodos))
      .catch(console.error);
  }, [setTodos]);

  function addTodoItem() {
    // Don't add empty items
    if (label === '') {
      return;
    }

    setLoading(true);
    // Update local storage with new item
    apiClient
      .addTodo(label)
      .then((newTodo) => {
        // Update components state with new item
        setTodos([...todos, newTodo]);
        setLabel('');
      })
      // Whether there's an error or not, remove the spinner
      .finally(() => {
        setLoading(false);
      });
  }

  function markTodoItemDone(todoId: string) {
    setLoading(true);
    // Update local storage with new `done` state of todo item
    apiClient
      .toggleDone(todoId)
      .then((updatedTodo) => {
        if (updatedTodo) {
          const updatedTodos = [...todos];
          // Find the updated item in the component's state
          const updated = updatedTodos.find(
            (todo) => todo.id === updatedTodo.id
          );
          if (updated) {
            // Update the item's done state
            updated.done = !updated.done;
          }
          // Update component's state with updated item's new state
          setTodos([...updatedTodos]);
        }
      })
      // Whether there's an error or not, remove the spinner
      .finally(() => {
        setLoading(false);
      });
  }

  // Drag and drop sort handler
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
      {loading && <Modal />}

      <Header />

      <AddToDo
        label={label}
        setLabel={setLabel}
        addtoDoItemHandler={addTodoItem}
      />

      <ToDoList
        todos={todos}
        onSortEnd={onSortEnd}
        markTodoItemDoneHandler={markTodoItemDone}
      />
    </>
  );
}

export default App;
