import { FC } from "react";

import styles from "./TasksDisplay.module.css";
import globalStyles from "./Global.module.css";
import { FaEllipsisV } from "react-icons/fa";
import TaskList from "./TasksList";
import { useTasks } from "../hooks/useTasks";
import useAuth from "../hooks/useAuth";

const TasksDisplay: FC = () => {
  // const tempTasks = [
  //   {
  //     id: "1",
  //     description: "Task 1",
  //     completedPomodoros: 0,
  //     estimatedPomodoros: 3,
  //     totalTime: 0,
  //   },
  // ];

  const { auth } = useAuth();

  const accessToken = auth?.accessToken;

  const { tasks } = useTasks(accessToken);

  return (
    <div className={`${styles.container}  ${globalStyles.divShadow}`}>
      <div className={styles.titleContainer}>
        <h2>Tasks</h2>
        <button>
          <FaEllipsisV className={styles.iconSettings} />
        </button>
      </div>

      <TaskList tasks={tasks} />
    </div>
  );
};

export default TasksDisplay;
