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
  const { categoryList, isAuthenticated, selectedCategoryId, userData } =
    useStore();

  const [videos, setVideos] = React.useState<videos[] | null | undefined>();
  const [thumbnails, setThumbnails] = React.useState<any | null | undefined>();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // replace "your_token_key" with the actual key

        // Build the headers object with the token
        const headers = {
          Authorization: `${token}`,
          // Add other headers if needed
        };

        const response = await fetch(
          `/api/videos?id=${selectedCategoryId}&user_id=${userData.user_id}`,
          { headers }
        );
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
        id: video.id,
        likes: video.likes,
        url: video.url,
        hasLike: video.hasLiked == 0 ? true : false,
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
  const likeVideo = async (videoId: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // replace "your_token_key" with the actual key

      // Build the headers object with the token
      const headers = {
        Authorization: `${token}`,
        // Add other headers if needed
      };

      const response = await fetch("/api/like-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          videoId: videoId,
        }),
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
  return (
    <>
      {thumbnails &&
        thumbnails.length > 0 &&
        thumbnails.map((video: any) => (
          <div
            key={video.id}
            className="bg-gray-100 rounded-md overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <img
              src={video.thumbnail || ""}
              // alt={video.title}
              className="w-full"
              style={{ height: "auto", borderRadius: "8px" }}
            />
            {video.hasLike && (
              <button
                onClick={() => likeVideo(video.id)}
                className="absolute bottom-0 right-0 z-10 bg-blue-500 text-white px-4 py-2 rounded-full"
              >
                Like
              </button>
            )}
            <button
              onClick={() => openYouTubeLink(video)}
              className="absolute bottom-0 left-0 z-10 bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              watch
            </button>
          </div>
        ))}
      {isAuthenticated && (
        <VideoForm onSubmit={handleSubmit} categories={categoryList} />
      )}
    </>
  );
};

export default ThumNailGrid;
