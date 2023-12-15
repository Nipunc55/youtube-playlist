/** @format */
"use client";

import { useStore } from "@/store/store";
import { useSearchParams } from "next/navigation";

import React from "react";

interface CategoryArrayProps {
  onCategoryChange: (categoryId: number) => void;
}

const CategoryArray = () => {
  const searchParams = useSearchParams();
  const { selectedCategoryId } = useStore();
  const [categories, setCategories] = React.useState<category[]>();

  const handleButtonClick = (categoryId: number) => {
    useStore.setState((prev) => ({ ...prev, selectedCategoryId: categoryId }));
    // Router.push({
    //   pathname: "/",
    //   query: { selectedCategoryId: categoryId },
    // });
    // router.refresh();
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
  }, []);

  return (
    <div className="fixed  px-3  w-full" style={{ top: "3.8rem" }}>
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
    </div>
  );
};
export default CategoryArray;
