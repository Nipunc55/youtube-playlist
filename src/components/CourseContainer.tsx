"use client";

import { useState, useEffect } from "react";
import CourseGrid from "./CourseGrid";

interface ThumNailGridProps {
  categoryId: number;
}
// { categoryId }: ThumNailGridProps
const CourseContainer = () => {
  const [loaded, setLoading] = useState(false);

  return (
    <>
      <div className=" w-full p-4 ">
        {/* <ThumNailGrid reload={loaded} /> */}
        <CourseGrid reload={loaded} />
      </div>
      {/* <Pagination /> */}
    </>
  );
};

export default CourseContainer;
