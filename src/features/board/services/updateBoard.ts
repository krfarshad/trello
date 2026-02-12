import { dbPut, STORES } from "@/utils/indexDb";
import { Board } from "@/features/board/types";

export const updateBoardService = async (board: Board): Promise<Board> => {
  return dbPut(STORES.boards, board);
};
