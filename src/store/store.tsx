import { boolean } from "drizzle-orm/mysql-core";
import { create } from "zustand";

export const useStore = create<{
  selectedCategoryId: number;
  categoryList: object[];
  categoryRefresh: Boolean;
  isAuthenticated: Boolean;
}>((set) => ({
  selectedCategoryId: 1,
  categoryList: [],
  categoryRefresh: false,
  isAuthenticated: false,
}));
