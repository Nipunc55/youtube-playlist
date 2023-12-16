/** @format */
"use client";

import { useStore } from "@/store/store";
import { useSearchParams } from "next/navigation";

import React, { useState } from "react";
import CategoryInput from "./CategoryInput";

interface CategoryArrayProps {
  onCategoryChange: (categoryId: number) => void;
}

const CategoryArray = () => {
  const searchParams = useSearchParams();
  const { selectedCategoryId, categoryRefresh } = useStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const [categories, setCategories] = useState<category[]>();

  const handleButtonClick = (categoryId: number) => {
    useStore.setState((prev) => ({ ...prev, selectedCategoryId: categoryId }));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();

        useStore.setState((prev) => ({ ...prev, categoryList: data.data }));

        setCategories(data.data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [categoryRefresh]);

  return (
    <div
      className="fixed px-3 w-full my-1 "
      style={{ top: "3.8rem", zIndex: "100" }}
    >
      {categories &&
        categories.map((category) => (
          <button
            key={category.id}
            className={`h-10 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mx-1 ${
              selectedCategoryId === category.id
                ? "bg-blue-500 text-white"
                : "bg-gray-50"
            }`}
            onClick={() => handleButtonClick(category.id)}
          >
            {category.category}
          </button>
        ))}

      <button
        className={`h-10 w-8 inline-flex items-center justify-center rounded-md text-center text-xs font-medium text-gray-300 ring-1 ring-inset mx-1`}
        style={{ verticalAlign: "middle" }}
        onClick={() => setModalOpen((pre) => !pre)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>

      <CategoryInput modalStatus={isModalOpen} />
    </div>
  );
};
export default CategoryArray;
