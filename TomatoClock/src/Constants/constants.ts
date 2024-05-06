export enum PomodoroPhase {
  Pomodoro = "Pomodoro",
  ShortBreak = "Short Break",
  LongBreak = "Long Break",
}

export enum PomodoroPhaseDuration {
  Pomodoro = 1 * 60,
  ShortBreak = 5 * 60,
  LongBreak = 15 * 60,
}

export const POMODOROS_PER_SET = 4;
