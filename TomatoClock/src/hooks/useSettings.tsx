import useLocalStorage from "./useLocalStorage";
import { Settings } from "../types/types";

function useSettings(): [Settings, (newSettings: Settings) => void] {
  const initialSettings: Settings = {
    pomodoroDuration: 1500,
    shortBreakDuration: 300,
    longBreakDuration: 900,
    pomodorosPerSet: 4,
  };

  const [settings, setSettings] = useLocalStorage<Settings>(
    "appSettings",
    initialSettings
  );

  return [settings, setSettings];
}

export default useSettings;
