import { FC, useState } from "react";
import { TasksItemType } from "../types/types";
import styles from "./TasksItem.module.css";
import useDeleteTask from "../hooks/useDeleteTask";

const TasksItem: FC<TasksItemType> = ({ task, isSelected, onTaskSelect }) => {
  const { description, completedPomodoros, _id, disableTask } = task;
  const [isDisabled, setIsDisabled] = useState<boolean>(disableTask);
  const deleteTask = useDeleteTask();

  const handleChooseChange = () => {
    onTaskSelect(_id);
  };

  const containerClass = `${styles.container} ${
    isSelected ? styles.selected : ""
  }`;

  const descriptionClass = `${styles.descriptionTitle} ${
    isDisabled ? styles.disabled : ""
  }`;

  return (
    <div className={containerClass}>
      <input
        type="checkbox"
        checked={isDisabled}
        onChange={() => setIsDisabled(!isDisabled)}
      />
      <h2 className={descriptionClass} onClick={handleChooseChange}>
        {description}
      </h2>
      <p className={styles.completedPomodoros}>
        Completed Pomodoros: {completedPomodoros}
      </p>
      <button onClick={() => deleteTask(_id)}>DETELE</button>
    </div>
  );
};

export default TasksItem;
