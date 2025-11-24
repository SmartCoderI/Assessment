import React from "react";
import type { Task } from "../hooks/useTasks";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  getDisplayMs: (task: Task) => number;
  onStartTask: (id: string) => void;
  onStopTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  getDisplayMs,
  onStartTask,
  onStopTask,
}) => {
  if (tasks.length === 0) {
    return (
      <p style={{ color: "#6b7280", marginTop: "1rem" }}>
        No tasks yet. Add one to get started.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          displayMs={getDisplayMs(task)}
          onStart={() => onStartTask(task.id)}
          onStop={() => onStopTask(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
