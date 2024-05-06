import { FC } from "react";
import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  value: number;
};

const ProgressBar: FC<ProgressBarProps> = ({ value }) => {
  value = value > 100 ? 100 : value;

  return (
    <div className={styles.frame}>
      <div className={styles.bar} style={{ width: `${value}%` }}></div>
    </div>
  );
};

export default ProgressBar;
