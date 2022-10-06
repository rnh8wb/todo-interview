interface AddToDoProps {
  label: string;
  setLabel: (value: React.SetStateAction<string>) => void;
  addtoDoItemHandler(): void;
}

export function AddToDo({ label, setLabel, addtoDoItemHandler }: AddToDoProps) {
  return (
    <div className="add-todo-container">
      <input
        id="to-do-input"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Buy groceries"
      />
      <button onClick={addtoDoItemHandler}>Add ToDo</button>
    </div>
  );
}
