import React from "react";
import type { Task } from "../hooks/useTasks";
import { formatDuration } from "../utils/formatTime";

interface TaskItemProps {
  task: Task;
  displayMs: number;
  onStart: () => void;
  onStop: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  displayMs,
  onStart,
  onStop,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        alignItems: "center",
        padding: "0.5rem 0.75rem",
        borderRadius: "6px",
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500 }}>{task.title}</div>
        <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
          {formatDuration(displayMs)}
        </div>
      </div>
      <button
        type="button"
        onClick={onStart}
        style={{
          padding: "0.35rem 0.65rem",
          borderRadius: "4px",
          border: "none",
          backgroundColor: task.isRunning ? "#9ca3af" : "#22c55e",
          color: "white",
          cursor: "pointer",
        }}
      >
        Start
      </button>
      <button
        type="button"
        onClick={onStop}
        style={{
          padding: "0.35rem 0.65rem",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#ef4444",
          color: "white",
          cursor: "pointer",
        }}
      >
        Stop
      </button>
    </div>
  );
};

export default TaskItem;
