"use client";
import { useRef } from "react";
import { useStore } from "@/store/store";

function StoreInitializer({
  selectedCategoryId,
  categoryRefresh,
  isAuthenticated,
}: {
  selectedCategoryId: number;
  categoryRefresh: Boolean;
  isAuthenticated: Boolean;
}) {
  const initialize = useRef(false);
  if (!initialize.current) {
    useStore.setState({ selectedCategoryId });
    initialize.current = true;
  }
  return null;
}
export default StoreInitializer;
