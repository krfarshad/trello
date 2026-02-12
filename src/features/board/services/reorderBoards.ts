import { dbPutAll, STORES } from "@/utils/indexDb";
import { Board } from "@/features/board/types";

export const reorderBoardsService = async (
  boards: Board[],
): Promise<void> => {
  return dbPutAll(STORES.boards, boards);
};
