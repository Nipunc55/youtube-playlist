/** @format */

// components/VideoGrid.js
"use client";
import { useStore } from "@/store/store";
import React from "react";
import VideoForm from "./VideosInput";
interface ThumNailGridProps {
  categoryId: number;
}
// { categoryId }: ThumNailGridProps
const ThumNailGrid = ({ reload }: { reload: boolean }) => {
  const [loaded, setLoading] = React.useState(false);
  const { categoryList } = useStore();
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
  }, [selectedCategoryId, loaded]);
  React.useEffect(() => {
    const thumbnails: any =
      videos &&
      videos.length > 0 &&
      videos.map((video: any, index) => ({
        thumbnail: extractYouTubeVideoId(video.url),
        id: index,
        likes: video.likes,
        url: video.url,
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
  const handleSubmit = (data: video) => {
    handleAddVideo(data);
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

      console.log(result.data);
      if (result.data.status == 400) {
        alert("video already exits!");
      }
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };
  const openYouTubeLink = (video: any) => {
    // Check if the video object has a valid YouTube link
    if (video && video.url) {
      // Open the YouTube link in a new tab
      window.open(video.url, "_blank");
    }
  };
  return (
    <>
      {thumbnails &&
        thumbnails.length > 0 &&
        thumbnails.map((video: any) => (
          <div
            key={video.id}
            className="bg-gray-100 rounded-md overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => openYouTubeLink(video)}
          >
            <img
              src={video.thumbnail || ""}
              // alt={video.title}
              className="w-full"
              style={{ height: "auto", borderRadius: "8px" }}
            />
          </div>
        ))}
      <VideoForm onSubmit={handleSubmit} categories={categoryList} />
    </>
  );
};

export default ThumNailGrid;
