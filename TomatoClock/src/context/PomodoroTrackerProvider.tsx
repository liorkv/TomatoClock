/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useCallback, useEffect, useState } from "react";
import { playRingSound } from "../utils/audioUtils";
import { PomodoroPhase } from "../Constants/constants.ts";
import { TimePercentage } from "../utils/clockHelpers.ts";
import { PomodoroTrackerContextType } from "../types/types.ts";
import useSettings from "../hooks/useSettings.tsx";
import { useIncrementTaskPomodoros } from "../hooks/useIncrementTaskPomodoros.tsx";
import axios from "../api/axios.ts";
import { useQueryClient } from "@tanstack/react-query";

const PomodoroTrackerContext = createContext<PomodoroTrackerContextType>({
  selectedTaskId: null,
  setSelectedTaskId: () => {},
  timeRemaining: 0,
  isActive: false,
  phaseType: null,
  pomodorosCompletedInTheSet: 0,
  startTimer: () => {},
  pauseTimer: () => {},
  resetTimer: () => {},
  skipToNextPhase: () => {},
  timePercentage: 0,
  pomodoroDuration: 0,
  shortBreakDuration: 0,
  longBreakDuration: 0,
});

export function PomodoroTrackerProvider({ children }) {
  const [settings, setSettings] = useSettings();

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(
    settings.pomodoroDuration
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phaseType, setPhaseType] = useState<PomodoroPhase>(
    PomodoroPhase.Pomodoro
  );
  const [pomodorosCompletedInTheSet, setPomodorosCompletedInTheSet] =
    useState<number>(0);
  const [totalPomodorosCompleted, setTotalPomodorosCompleted] =
    useState<number>(0);
  const [timePercentage, setTimePercentage] = useState<number>(0);

  const incrementTaskPomodoros = useIncrementTaskPomodoros();

  const queryClient = useQueryClient();

  useEffect(
    function () {
      let timer;

      if (isActive && timeRemaining > 0) {
        timer = setInterval(function () {
          setTimeRemaining((prevTime) => prevTime - 1);

          setTimePercentage(
            TimePercentage(
              timeRemaining,
              phaseType,
              settings.pomodoroDuration,
              settings.shortBreakDuration,
              settings.longBreakDuration
            )
          );
        }, 1000);
      }

      if (timeRemaining === 0) {
        clearInterval(timer);
        playRingSound();
        handleSessionTransition();
      }

      return function () {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isActive, timeRemaining]
  );

  const handleSessionTransition = async function () {
    setTimePercentage(0);
    if (phaseType === PomodoroPhase.Pomodoro && selectedTaskId) {
      console.log("phase is pomodoro and task is selected");
      await axios.patch(
        `/task/increment/${selectedTaskId}`,
        { pomodoroTime: settings.pomodoroDuration },
        {}
      );
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      console.log("the tasks is: ", selectedTaskId);
    }

    if (phaseType === PomodoroPhase.Pomodoro) {
      setPomodorosCompletedInTheSet(
        (prevPomodorosCompletedInTheSet) => prevPomodorosCompletedInTheSet + 1
      );
      setTotalPomodorosCompleted(
        (prevTotalPomodorosCompleted) => prevTotalPomodorosCompleted + 1
      );

      console.log(totalPomodorosCompleted, pomodorosCompletedInTheSet);
    }

    if (
      phaseType === PomodoroPhase.Pomodoro &&
      pomodorosCompletedInTheSet === settings.pomodorosPerSet - 1
    ) {
      setPhaseType(PomodoroPhase.LongBreak);
      setTimeRemaining(settings.longBreakDuration);
      setPomodorosCompletedInTheSet(0);
    } else if (
      phaseType === PomodoroPhase.Pomodoro &&
      pomodorosCompletedInTheSet < settings.pomodorosPerSet - 1
    ) {
      setPhaseType(PomodoroPhase.ShortBreak);
      setTimeRemaining(settings.shortBreakDuration);
    } else {
      setPhaseType(PomodoroPhase.Pomodoro);
      setTimeRemaining(settings.pomodoroDuration);
    }

    setIsActive(false);
  };

  // const updateTaskPomodoros = function (taskId: number) {
  //   const updatedTasks = tasks.map((task) => {
  //     if (Number(task.id) === taskId) {
  //       return {
  //         ...task,
  //         completedPomodoros: task.completedPomodoros + 1,
  //       };
  //     }
  //     return task;
  //   });

  //   // setTasks(updatedTasks);
  // };

  const startTimer = useCallback(() => {
    setIsActive(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimePercentage(0);

    if (phaseType === PomodoroPhase.Pomodoro) {
      setTimeRemaining(settings.pomodoroDuration);
    } else if (phaseType === PomodoroPhase.ShortBreak) {
      setTimeRemaining(settings.shortBreakDuration);
    } else if (phaseType === PomodoroPhase.LongBreak) {
      setTimeRemaining(settings.longBreakDuration);
    }
  }, [
    phaseType,
    settings.longBreakDuration,
    settings.pomodoroDuration,
    settings.shortBreakDuration,
  ]);

  const skipToNextPhase = function () {
    handleSessionTransition();
  };

  return (
    <PomodoroTrackerContext.Provider
      value={{
        selectedTaskId,
        setSelectedTaskId,
        timeRemaining,
        isActive,
        phaseType,
        pomodorosCompletedInTheSet,
        startTimer,
        pauseTimer,
        resetTimer,
        skipToNextPhase,
        timePercentage,
        pomodoroDuration: settings.pomodoroDuration,
        shortBreakDuration: settings.shortBreakDuration,
        longBreakDuration: settings.longBreakDuration,
      }}
    >
      {children}
    </PomodoroTrackerContext.Provider>
  );
}

export default PomodoroTrackerContext;
