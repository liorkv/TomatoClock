export type PomodoroTrackerContextType = {
  selectedTaskId;
  setSelectedTaskId;
  timeRemaining: number;
  isActive: boolean;
  phaseType;
  pomodorosCompletedInTheSet: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipToNextPhase: () => void;
  timePercentage: number;
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  setSettings;
};

export type Task = {
  _id: string;
  description: string;
  completedPomodoros: number;
  estimatedPomodoros: number;
  totalTime: number;
  disableTask: boolean;
};

export type Settings = {
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  pomodorosPerSet: number;
};

export type TasksItemType = {
  task: Task;
  isSelected: boolean;
  onTaskSelect: (taskId: string) => void;
};
