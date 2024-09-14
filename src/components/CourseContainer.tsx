"use client";

import { useState, useEffect } from "react";
import CourseGrid from "./CourseGrid";
import CreateCourse from "./CreateCourse";

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
      <CreateCourse />
      {/* <Pagination /> */}
    </>
  );
};

export default CourseContainer;
