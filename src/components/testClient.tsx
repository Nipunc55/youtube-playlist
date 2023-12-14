/** @format */
"use client";

import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";

import React from "react";

interface CategoryArrayProps {
  onCategoryChange: (categoryId: number) => void;
}
const TestClient = () => {
  const router = useRouter();
  const { selectedCategoryId } = useStore();
  const [categories, setCategories] = React.useState<category[]>();
  console.log(useStore.getState().selectedCategoryId);
  return (
    <div className="fixed  px-3 bg-gray-800 w-full" style={{ top: "3.8rem" }}>
      {categories &&
        categories.map((category) => (
          <button
            key={category.id}
            className={`h-10 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mx-1 ${
              selectedCategoryId === category.id
                ? "bg-blue-500 text-white"
                : "bg-gray-50"
            }`}
          >
            {category.category}
          </button>
        ))}
    </div>
  );
};
export default TestClient;
