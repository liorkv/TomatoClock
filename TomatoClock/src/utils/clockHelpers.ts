import { PomodoroPhase } from "../Constants/constants";

const TimePercentage = function (
  timeRemaining: number,
  phaseType: PomodoroPhase,
  pomodoroDuration: number,
  shortBreakDuration: number,
  longBreakDuration: number
) {
  const totalTimeOfSession =
    phaseType === PomodoroPhase.Pomodoro
      ? pomodoroDuration
      : phaseType === PomodoroPhase.ShortBreak
      ? shortBreakDuration
      : longBreakDuration;

  return 100 - (timeRemaining / totalTimeOfSession) * 100 > 99
    ? 100
    : 100 - (timeRemaining / totalTimeOfSession) * 100;
};

const formatTime = function (timeRemaining: number) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export { TimePercentage, formatTime };
