import { useEffect } from "react";

import toast from "react-hot-toast";
import { usePomodoroTracker } from "../hooks/usePomodoroTracker";

function PauseClock() {
  const { isActive, pauseTimer } = usePomodoroTracker();

  useEffect(() => {
    if (isActive) {
      pauseTimer();
      toast("Timer has been stopped", {
        icon: "⏸️",
        style: {
          fontSize: "16px",
        },
      });
    }
  }, [isActive, pauseTimer]);
  return <></>;
}

export default PauseClock;
