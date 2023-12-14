/** @format */

// components/VideoGrid.js
"use client";
import { useStore } from "@/store/store";
import React from "react";
interface ThumNailGridProps {
  categoryId: number;
}
// { categoryId }: ThumNailGridProps
const ThumNailGrid = ({ reload }: { reload: boolean }) => {
  const { selectedCategoryId } = useStore();
  const [videos, setVideos] = React.useState<videos[] | null | undefined>();
  const [thumbnails, setThumbnails] = React.useState<any | null | undefined>();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/videos?id=${selectedCategoryId}`);
        const data = await response.json();
        setVideos(data.data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [selectedCategoryId, reload]);
  React.useEffect(() => {
    const thumbnails: any =
      videos &&
      videos.map((video: any, index) => ({
        thumbnail: extractYouTubeVideoId(video.url),
        id: index,
        likes: video.likes,
      }));
    setThumbnails(thumbnails);
  }, [videos]);
  function extractYouTubeVideoId(url: string) {
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
    }
    return null;
  }

  return (
    <>
      {thumbnails &&
        thumbnails.map((video: any) => (
          <div key={video.id} className="bg-gray-100  rounded-md">
            <img
              src={video.thumbnail || ""}
              // alt={video.title}
              className="w-full"
              style={{ height: "auto", borderRadius: "8px" }}
            />
          </div>
        ))}
    </>
  );
};

export default ThumNailGrid;
