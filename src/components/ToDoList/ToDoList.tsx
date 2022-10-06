import { ToDo } from '../../ApiClient';
import { ToDoItem } from '../ToDoItem/ToDoItem';
import { SortableContainer } from 'react-sortable-hoc';

interface ToDoListProps {
  todos: ToDo[];
  markTodoItemDoneHandler(id: string): void;
}

function _ToDoList({ todos, markTodoItemDoneHandler }: ToDoListProps) {
  return (
    <div>
      {todos.map((todo, index) => (
        <ToDoItem
          key={todo.id}
          index={index}
          todo={todo}
          markTodoItemDoneHandler={markTodoItemDoneHandler}
        />
      ))}
    </div>
  );
}

// The SortableContainer HOC allows us to drag and drop items in the list
export const ToDoList = SortableContainer<ToDoListProps>(_ToDoList);
