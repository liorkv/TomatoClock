import { useContext } from "react";
import PomodoroTrackerContext from "../context/PomodoroTrackerProvider";

export function usePomodoroTracker() {
  return useContext(PomodoroTrackerContext);
}
