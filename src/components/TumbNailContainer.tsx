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
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [loaded, setLoading] = useState(false);
  const { categoryList } = useStore();

  const handleSubmit = (data: video) => {
    console.log("Submitted data:", data);
    handleAddVideo(data);
    setPopupOpen(false);
  };
  const handleAddVideo = async (videoData: video) => {
    setLoading(true);
    try {
      const response = await fetch("/api/add-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to add video");
      }
      setLoading(false);

      const result = await response.json();
      console.log("Video added successfully:", result.data);
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full p-4 ">
        <ThumNailGrid reload={loaded} />
      </div>
      {/* <Pagination /> */}
    </>
  );
};

export default TumbNailContainer;
