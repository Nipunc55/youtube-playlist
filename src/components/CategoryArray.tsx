/** @format */
"use client";

import { useStore } from "@/store/store";
import { useSearchParams } from "next/navigation";

import React, { useState } from "react";
import CategoryInput from "./CategoryInput";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";
interface CategoryArrayProps {
  onCategoryChange: (categoryId: number) => void;
}

const CategoryArray = () => {
  const searchParams = useSearchParams();

  const [limits, setLimits] = useState({ minX: -80, maxX: 1 });
  const [selectedCategoryId, setCategory] = useState(1);
  const { categoryRefresh } = useStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const [categories, setCategories] = useState<category[]>();
  const [style, set] = useSpring(() => ({ x: 0 }));

  const handleSlide = (index: any) => {
    set((pre: any) => ({ x: -index * 5 + pre.x })); // Adjust the width of each slide as needed
  };
  const bind = useGesture({
    onDrag: ({ offset: [x] }) => {
      set({ x });
    },
  });
  const handleButtonClick = (categoryId: number) => {
    useStore.setState((prev) => ({ ...prev, selectedCategoryId: categoryId }));
  };
  React.useEffect(() => {
    const categoryId = Number(searchParams.get("category")) || 1;
    setCategory(categoryId);
  }, []);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();

        useStore.setState((prev) => ({ ...prev, categoryList: data.data }));

        setCategories(data.data);
        const screenWidth = window.innerWidth;
        setLimits((pre) => ({
          ...pre,
          minX: (-4500 * data.data.length) / screenWidth,
        }));
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [categoryRefresh]);
  function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
  return (
    <div
      className="fixed px-3 w-full my-1 "
      style={{ top: "3.8rem", zIndex: "99" }}
      {...bind()}
    >
      <animated.div
        style={{
          display: "flex",
          transform: style.x.interpolate(
            (x) => `translate3d(${clamp(x, limits.minX, limits.maxX)}%, 0, 0)`
          ),
          // transform: style.x.interpolate((x) => `translate3d(${x}%, 0, 0)`),
        }}
      >
        {categories &&
          categories?.length > 0 &&
          categories
            ?.sort((a, b) => a.id - b.id)
            ?.map((category, index) => (
              <button
                key={category.id}
                className={`h-10 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mx-1 ${
                  selectedCategoryId === category.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-50"
                }`}
                onClick={() => {
                  handleSlide(index);
                  handleButtonClick(category.id);
                }}
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
      </animated.div>

      <CategoryInput modalStatus={isModalOpen} />
    </div>
  );
};
export default CategoryArray;
