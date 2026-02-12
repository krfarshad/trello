import { dbDelete, STORES } from "@/utils/indexDb";

export const deleteBoardService = async (id: string): Promise<void> => {
  return dbDelete(STORES.boards, id);
};
