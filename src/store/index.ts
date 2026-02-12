import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { boardReducer } from "@/features/board";
import { taskReducer } from "@/features/task";
import { commentReducer } from "@/features/comment";

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    tasks: taskReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
