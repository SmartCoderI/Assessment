import React from "react";
import { useTasks } from "./hooks/useTasks";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  const { tasks, addTask, startTask, stopTask, getDisplayMs } = useTasks();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "3rem",
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 1rem",
          padding: "1.5rem",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 25px rgba(15, 23, 42, 0.07)",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "0.5rem",
          }}
        >
          Task Timer
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
          Add tasks and track time. Only one task runs at a time.
        </p>

        <AddTaskForm onAddTask={addTask} />

        <div style={{ marginTop: "1.5rem" }}>
          <TaskList
            tasks={tasks}
            getDisplayMs={getDisplayMs}
            onStartTask={startTask}
            onStopTask={stopTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
