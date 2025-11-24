import React, { useState, KeyboardEvent, ChangeEvent } from "react";

interface AddTaskFormProps {
  onAddTask: (title: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [value, setValue] = useState<string>("");

  const handleAdd = (): void => {
    onAddTask(value);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{
          flex: 1,
          padding: "0.5rem 0.75rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="button"
        onClick={handleAdd}
        style={{
          padding: "0.5rem 0.75rem",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#2563eb",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddTaskForm;
