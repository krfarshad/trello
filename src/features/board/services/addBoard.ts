import { dbAdd, STORES } from "@/utils/indexDb";
import { Board } from "@/features/board/types";

export const addBoardService = async (board: Board): Promise<Board> => {
  return dbAdd(STORES.boards, board);
};
