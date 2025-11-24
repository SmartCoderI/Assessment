import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

const POMODORO_SECONDS = 25 * 60; // 25:00

const App: React.FC = () => {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    POMODORO_SECONDS
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Timer effect
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setRemainingSeconds((prev: number) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning]);

  const handleStart = () => {
    if (remainingSeconds === 0) {
      // If finished, restart a new pomodoro
      setRemainingSeconds(POMODORO_SECONDS);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const mm = minutes.toString().padStart(2, "0");
    const ss = seconds.toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const isFinished = remainingSeconds === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Task info */}
        <View style={styles.header}>
          <Text style={styles.taskTitle}>Deep Work Session</Text>
          <Text style={styles.taskDescription}>
            Focus on implementing the task timer logic and polishing the UI.
            Avoid distractions during this 25-minute block.
          </Text>
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerLabel}>Pomodoro</Text>
          <Text style={styles.timerValue}>{formatTime(remainingSeconds)}</Text>
          {isFinished && (
            <Text style={styles.finishedText}>Session complete 🎉</Text>
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={handleStart}
            disabled={isRunning}
          >
            <Text style={styles.buttonText}>
              {isFinished ? "Restart" : isRunning ? "Running" : "Start"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.pauseButton]}
            onPress={handlePause}
            disabled={!isRunning}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  header: {
    gap: 8,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  taskDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  timerLabel: {
    fontSize: 16,
    color: "#6b7280",
  },
  timerValue: {
    fontSize: 64,
    fontWeight: "700",
    letterSpacing: 2,
    color: "#111827",
  },
  finishedText: {
    marginTop: 8,
    fontSize: 14,
    color: "#16a34a",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  startButton: {
    backgroundColor: "#2563eb",
  },
  pauseButton: {
    backgroundColor: "#6b7280",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default App;
