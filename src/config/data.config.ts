import { Board } from "@/features/board";
import { Task } from "@/features/task";

export const seedBoards: Board[] = [
  { id: "board-1", title: "Todo", position: 65535 },
  { id: "board-2", title: "In Progress", position: 131070 },
  { id: "board-3", title: "Done", position: 196605 },
];

export const seedTasks: Task[] = [
  {
    id: "task-1",
    boardId: "board-1",
    title: "Create interview Kanban",
    position: 65535,
  },
  {
    id: "task-2",
    boardId: "board-1",
    title: "Review Drag & Drop",
    position: 131070,
  },
  {
    id: "task-3",
    boardId: "board-2",
    title: "Set up Next.js project",
    position: 65535,
  },
];
