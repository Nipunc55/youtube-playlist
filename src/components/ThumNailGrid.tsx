/** @format */

// components/VideoGrid.js
"use client";
import { useStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import VideoForm from "./VideosInput";
import OneLogin from "next-auth/providers/onelogin";
import Pagination from "./Pagination";
import toast, { Toaster } from "react-hot-toast";
import VideoCard from "./videoCards/videoCard";
import Loading from "./videoCards/loading";
interface ThumNailGridProps {
  categoryId: number;
}
// { categoryId }: ThumNailGridProps
const ThumNailGrid = ({ reload }: { reload: boolean }) => {
  const [loaded, setLoading] = useState(true);
  const [pageNumber, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [refresh, setRefreshRoute] = useState(false);

  const { categoryList, isAuthenticated, selectedCategoryId, userData } =
    useStore();

  const [videos, setVideos] = React.useState<videos[] | null | undefined>();
  const [thumbnails, setThumbnails] = React.useState<any | null | undefined>();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // replace "your_token_key" with the actual key

        // Build the headers object with the token
        const headers = {
          Authorization: `${token}`,
          // Add other headers if needed
        };

        const response = await fetch(
          `/api/videos?id=${selectedCategoryId}&user_id=${userData.user_id}&pageNumber=${pageNumber}`,
          { headers }
        );
        const data = await response.json();

        setVideos(data.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategoryId, refresh, pageNumber]);
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
  React.useEffect(() => {
    setPageNum(0);
  }, [selectedCategoryId]);
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
      const token = localStorage.getItem("token");

      // Build the headers object with the token
      const headers = {
        Authorization: `${token}`,
      };

      const response = await fetch("/api/add-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(videoData),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to add video");
      }
      // setLoading(false);

      const result = await response.json();

      setRefreshRoute((pre) => !pre);
      if (result.data.status == 400) {
        toast.error("video already exits!");
      }
    } catch (error) {
      console.error("Error adding video:", error);
      toast.error("Error adding video:");
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
        toast.error("server eror!");

        throw new Error("Failed to add video");
      }

      const result = await response.json();
      setRefreshRoute((pre) => !pre);
      // setLoading(false);
      toast.success("Liked!");

      if (result.data.status == 400) {
        toast.error("server eror!");
      }
    } catch (error) {
      console.error("Error adding video:", error);
      toast.error(`${error}`);
      setLoading(false);
    }
  };
  return (
    <>
      <VideoCard
        thumbnails={thumbnails}
        isAuthenticated={isAuthenticated}
        likeVideo={likeVideo}
        openYouTubeLink={openYouTubeLink}
      />

      {isAuthenticated && (
        <VideoForm onSubmit={handleSubmit} categories={categoryList} />
      )}

      <Pagination
        thumbnails={thumbnails}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageNum={setPageNum}
      />
      <Loading loaded={loaded} />
      <Toaster />
    </>
  );
};

export default ThumNailGrid;
