import axios from "../api/axios";

// const response = await axios.get("/refresh", {
//   withCredentials: true,
// });

export async function getTasks() {
  try {
    const response = await axios.get("/task");
    return response.data;
  } catch (error) {
    console.error(error);
  }
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
