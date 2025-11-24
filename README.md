
Part A (Web): React + TypeScript task manager with per-task timers
Part B (Mobile): React Native + Expo Pomodoro-style task detail screen

assessment-repo/
├── web/                # Part A — React/Next.js (web)
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # Timer & task logic
│   │   └── utils/        # Helpers (e.g., time formatting)
│   └── package.json
├── mobile/             # Part B — React Native (Expo)
│   ├── App.tsx          # Task Detail screen with Pomodoro timer
│   └── package.json
└── README.md

Setup Instructions
Prerequisites: Node.js (v16+) 
For mobile: Expo CLI (installed automatically)

Web App
cd web
npm install
npm run dev
Open the URL shown in the terminal 
Build:npm run build

Mobile App (Expo)
cd mobile
npm install
npm start
Then choose:
i — run on iOS Simulator
a — run on Android Emulator
w — run in browser
or scan QR code with Expo Go

Design & Technical Decisions
Part A — Web Application (React + TS)
-Core Features
-Add tasks
-Start/stop timers
-Only one running task at a time
-Auto-accumulate time
-Persist tasks using localStorage

Architecture
-useTasks custom hook
 Encapsulates all logic: add, start/stop, accumulated time, persistence.
-Component structure:
  AddTaskForm — input + add button
  TaskList — renders all tasks
  TaskItem — individual task row
-Timer logic:
  Uses accumulatedMs + startedAt timestamp
  Live updates using a setInterval tick-
  Starting one task automatically stops the previous one
-Persistence
  Tasks stored in localStorage
  On refresh, tasks reload and running ones are marked stopped (simple + predictable)

Part B — Mobile Application (React Native + Expo)
Core Features
-Task title + description
-25:00 Pomodoro countdown
-Start / Pause
-Resume functionality
-Clean mobile UI

Architecture
-Simple component state (useState)
-Timer loop managed via useEffect
-Layout built with React Native components: SafeAreaView, View, Text, TouchableOpacity

Timer Logic
-remainingSeconds starts at 1500
-isRunning starts interval that decrements every second
-Auto-stops at 0
-Pause simply stops the interval