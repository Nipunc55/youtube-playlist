"use client";

import { useStore } from "@/store/store";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";
import ThumNailGrid from "./ThumNailGrid";
import VideoForm from "./VideosInput";
interface ThumNailGridProps {
  categoryId: number;
}
// { categoryId }: ThumNailGridProps
const TumbNailContainer = () => {
  const [loaded, setLoading] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full p-4 ">
        <ThumNailGrid reload={loaded} />
      </div>
      {/* <Pagination /> */}
    </>
  );
};

export default TumbNailContainer;
