import { FC, useState } from "react";
import { Task } from "../types/types";
import TasksItem from "./TasksItem";
import styles from "./TasksList.module.css";
import { usePomodoroTracker } from "../hooks/usePomodoroTracker";
import { useCreateTask } from "../hooks/useCreateTask";

type TaskListType = {
  tasks: Task[];
};

const TaskList: FC<TaskListType> = ({ tasks }) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>("");

  const { setSelectedTaskId: setSelectedTaskIdClock } = usePomodoroTracker();
  const { createTask } = useCreateTask();

  const handleTaskSelection = (taskId: string) => {
    setSelectedTaskId((prevSelectedTaskId) => {
      if (prevSelectedTaskId === taskId) {
        setSelectedTaskIdClock(null);
        return null;
      } else {
        setSelectedTaskIdClock(taskId);
        return taskId;
      }
    });
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
    setNewTaskName("");
  };

  const handleAddTask = () => {
    createTask(newTaskName);

    handleHideForm();
  };

  const handleNewTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(e.target.value);
  };

  return (
    <div className={styles.container}>
      {tasks?.map((task) => (
        <TasksItem
          key={task._id}
          task={task}
          isSelected={task._id === selectedTaskId}
          onTaskSelect={handleTaskSelection}
        />
      ))}

      <div className={styles.addTaskContainer}>
        {showForm ? (
          <div className={styles.formContainer}>
            <input
              type="text"
              value={newTaskName}
              onChange={handleNewTaskNameChange}
              placeholder="Enter task name"
              className={styles.textbox}
            />

            <div className={styles.buttonsContainer}>
              <button onClick={handleAddTask} className={styles.addTaskButton}>
                Add
              </button>
              <button onClick={handleHideForm} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={handleShowForm} className={styles.addTaskButton}>
            Add Task
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskList;
