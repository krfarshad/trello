import { dbGetAll, STORES } from "@/utils/indexDb";
import { Board } from "@/features/board/types";

export const getBoardsService = async (): Promise<Board[]> => {
  return dbGetAll<Board>(STORES.boards);
};
