import { FC } from "react";
import ClockTime from "../ui/ClockTime";
import styles from "./Clock.module.css";
import TasksDisplay from "../ui/TasksDisplay";
import useAuth from "../hooks/useAuth";

const Clock: FC = () => {
  const { auth } = useAuth();

  return (
    <div className={styles.container}>
      <ClockTime />
      {auth.accessToken !== undefined && <TasksDisplay />}
    </div>
  );
};

export default Clock;
