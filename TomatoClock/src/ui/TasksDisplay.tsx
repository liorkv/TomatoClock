import { FC } from "react";

import styles from "./TasksDisplay.module.css";
import globalStyles from "./Global.module.css";
import { FaEllipsisV } from "react-icons/fa";
import TaskList from "./TasksList";
import { useTasks } from "../hooks/useTasks";

const TasksDisplay: FC = () => {
  const { tasks } = useTasks();

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
