import React from 'react';
import { ToDo } from '../../ApiClient';
import { SortableElement } from 'react-sortable-hoc';

interface ToDoItemProps {
  todo: ToDo;
  markTodoItemDoneHandler(id: string): void;
}

function _ToDoItem({ todo, markTodoItemDoneHandler }: ToDoItemProps) {
  return (
    <div key={todo.id} className="todo-item">
      <label style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.label}
      </label>
      <button onClick={() => markTodoItemDoneHandler(todo.id)}>
        Mark {todo.done ? 'Undone' : 'Done'}
      </button>
    </div>
  );
}

export const ToDoItem = SortableElement<ToDoItemProps>(_ToDoItem);