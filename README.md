
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

The codebase is organized to separate concerns and promote maintainability. 
For the web application, a custom `useTasks` hook centralizes all task and timer logic, encapsulating state management, localStorage persistence, and the single-active-timer constraint. This approach keeps components focused on presentation while the hook handles business logic. The component structure follows a clear hierarchy: `AddTaskForm` for input, `TaskList` for orchestration, and `TaskItem` for individual task rendering. Timer implementation uses accumulated milliseconds plus a `startedAt` timestamp, allowing accurate time tracking even when the page is refreshed (timers are stopped on reload for predictability). 
For the mobile app, a simpler state-based approach with `useState` and `useEffect` suffices for the Pomodoro timer, as it's a single-screen feature without complex state management needs. The separation of web and mobile codebases allows each to use platform-appropriate patterns and dependencies without cross-contamination.