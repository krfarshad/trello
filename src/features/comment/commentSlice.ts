import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "@/features/comment/types";

interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: [],
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },
    addComment(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
    },
  },
});

export const commentActions = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
