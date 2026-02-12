import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/features/task/types";

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    removeTasksByBoard(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.boardId !== action.payload);
    },
    reorderTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    moveTask(
      state,
      action: PayloadAction<{ taskId: string; toBoardId: string }>,
    ) {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) task.boardId = action.payload.toBoardId;
    },
  },
});

export const taskActions = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
