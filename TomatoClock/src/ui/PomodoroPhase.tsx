import { FC } from "react";
import styles from "./PomodoroPhase.module.css";
import { PomodoroPhase as PomodoroPhaseEnum } from "../Constants/constants";

type PomodoroPhaseProps = {
  phase: PomodoroPhaseEnum;
};

const getStyleByPhase = (
  phaseName: PomodoroPhaseEnum,
  currentPhase: PomodoroPhaseEnum
) => {
  if (phaseName === currentPhase) {
    return `${styles.phase} ${styles.currentPhase}`;
  }
  return styles.phase;
};

const PomodoroPhase: FC<PomodoroPhaseProps> = ({ phase }) => {
  return (
    <div className={styles.container}>
      <div className={getStyleByPhase(PomodoroPhaseEnum.Pomodoro, phase)}>
        Pomodoro
      </div>
      <div className={getStyleByPhase(PomodoroPhaseEnum.ShortBreak, phase)}>
        Short Break
      </div>
      <div className={getStyleByPhase(PomodoroPhaseEnum.LongBreak, phase)}>
        Long Break
      </div>
    </div>
  );
};

export default PomodoroPhase;
