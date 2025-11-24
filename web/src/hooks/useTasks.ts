import { useEffect, useState } from "react";

export interface Task {
  id: string;
  title: string;
  accumulatedMs: number; // total time already tracked
  isRunning: boolean;
  startedAt: number | null; // timestamp in ms when started
}

const STORAGE_KEY = "task-timer-tasks";

function loadInitialTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: Task[] = JSON.parse(raw);

    // On reload, treat any running tasks as stopped (simple behaviour).
    return parsed.map((task) => ({
      ...task,
      isRunning: false,
      startedAt: null,
    }));
  } catch {
    return [];
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadInitialTasks());
  const [now, setNow] = useState<number>(Date.now());

  // Tick every second to update running task display
  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: trimmed,
        accumulatedMs: 0,
        isRunning: false,
        startedAt: null,
      },
    ]);
  };

  const startTask = (id: string) => {
    setTasks((prev) => {
      const nowTs = Date.now();
      return prev.map((task) => {
        // Starting this task
        if (task.id === id) {
          if (task.isRunning) return task; // already running
          return {
            ...task,
            isRunning: true,
            startedAt: nowTs,
          };
        }

        // Stop any other running task and accumulate its time
        if (task.isRunning && task.startedAt != null) {
          const extra = nowTs - task.startedAt;
          return {
            ...task,
            isRunning: false,
            startedAt: null,
            accumulatedMs: task.accumulatedMs + extra,
          };
        }

        return task;
      });
    });
  };

  const stopTask = (id: string) => {
    setTasks((prev) => {
      const nowTs = Date.now();
      return prev.map((task) => {
        if (task.id !== id) return task;
        if (!task.isRunning || task.startedAt == null) return task;

        const extra = nowTs - task.startedAt;
        return {
          ...task,
          isRunning: false,
          startedAt: null,
          accumulatedMs: task.accumulatedMs + extra,
        };
      });
    });
  };

  const getDisplayMs = (task: Task): number => {
    if (!task.isRunning || task.startedAt == null) return task.accumulatedMs;
    const extra = now - task.startedAt;
    return task.accumulatedMs + extra;
  };

  return {
    tasks,
    addTask,
    startTask,
    stopTask,
    getDisplayMs,
  };
}
