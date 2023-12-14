import { create } from "zustand";

export const useStore = create<{
  selectedCategoryId: number;
  categoryList: object[];
}>((set) => ({
  selectedCategoryId: 1,
  categoryList: [],
}));
