/* eslint-disable @typescript-eslint/no-unused-vars */

import styles from "./ClockTime.module.css";
import globalStyles from "./Global.module.css";
import ProgressBar from "./ProgressBar";
import { FaStepForward } from "react-icons/fa";
import { usePomodoroTracker } from "../hooks/usePomodoroTracker.tsx";
import PomodoroPhase from "./PomodoroPhase";
import { formatTime } from "../utils/clockHelpers.ts";
import useSettings from "../hooks/useSettings.tsx";
import { useEffect } from "react";

function ClockTime() {
  const {
    timeRemaining,
    startTimer,
    pauseTimer,
    timePercentage,
    isActive,
    resetTimer,
    skipToNextPhase,
    phaseType,
  } = usePomodoroTracker();

  return (
    <>
      <ProgressBar value={timePercentage} />
      <div className={`${styles.container} ${globalStyles.divShadow}`}>
        <PomodoroPhase phase={phaseType} />
        <div className={styles.time}>
          <span>{formatTime(timeRemaining)}</span>
        </div>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.button}
            onClick={() => {
              if (!isActive) {
                startTimer();
              } else {
                pauseTimer();
              }
            }}
          >
            {!isActive ? "Start" : "Pause"}
          </button>
          <button
            className={styles.button}
            onClick={() => {
              resetTimer();
            }}
          >
            Reset
          </button>
          <FaStepForward
            className={styles.skipButton}
            onClick={skipToNextPhase}
          />
        </div>
      </div>
    </>
  );
}

export default ClockTime;
