import axios from "../api/axios";

export async function getTasks() {
  const response = await axios.get("/task");
  return response.data;
}

export async function createTask(description: string) {
  const response = await axios.post("/task", {
    description,
  });
  return response.data;
}

export async function increamentCompletedPomodoros(taskId: string) {
  const response = await axios.patch(`/task_pomodoros/${taskId}`);

  return response.data;
}
