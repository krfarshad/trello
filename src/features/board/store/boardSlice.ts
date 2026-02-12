import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board } from "@/features/board/types";

interface BoardState {
  boards: Board[];
  boardTitle: string;
}

const initialState: BoardState = {
  boards: [],
  boardTitle: "Demo Board",
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards(state, action: PayloadAction<Board[]>) {
      state.boards = action.payload;
    },
    addBoard(state, action: PayloadAction<Board>) {
      state.boards.push(action.payload);
    },
    updateBoard(state, action: PayloadAction<{ id: string; title: string }>) {
      const board = state.boards.find((b) => b.id === action.payload.id);
      if (board) board.title = action.payload.title;
    },
    removeBoard(state, action: PayloadAction<string>) {
      state.boards = state.boards.filter((b) => b.id !== action.payload);
    },
    reorderBoards(state, action: PayloadAction<Board[]>) {
      state.boards = action.payload;
    },
    setBoardTitle(state, action: PayloadAction<string>) {
      state.boardTitle = action.payload;
    },
  },
});

export const boardActions = boardSlice.actions;
export const boardReducer = boardSlice.reducer;
