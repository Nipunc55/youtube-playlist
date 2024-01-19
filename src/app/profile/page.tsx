// components/LoginForm.js
"use client";

import Pagination from "@/components/Pagination";
import ProfileVideoCard from "@/components/videoCards/profileVideoCard";
import VideoCard from "@/components/videoCards/videoCard";
import extractYouTubeVideoId from "@/utils/thumbNailExtracter";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function RegisterForm() {
  const [loaded, setLoading] = useState(true);
  const [statData, setStatData] = useState<any>({
    totalLikes: 0,
    totalVideos: 0,
    user_id: "0",
  });
  const [thumbnails, setThumbnails] = useState<any>();
  const [pageNumber, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [refresh, setRefreshRoute] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Build the headers object with the token
      const headers = {
        Authorization: `${token}`,
        // Add other headers if needed
      };

      const response = await fetch(
        `/api/my-videos?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          headers,
        }
      );
      const data = await response.json();
      const videos = data.data;
      const thumbnails: any =
        videos &&
        videos.length > 0 &&
        videos.map((video: any) => ({
          thumbnail: extractYouTubeVideoId(video.url),
          id: video.id,
          likes: video.likes,
          url: video.url,
          hasLike: video.hasLiked == 0 ? true : false,
        }));
      setThumbnails(thumbnails);

      setLoading(false);
    } catch (error) {
      console.log("Error fetching categories:", error);
      setLoading(false);
    }
  };
  const getStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Build the headers object with the token
      const headers = {
        Authorization: `${token}`,
        // Add other headers if needed
      };

      const response = await fetch(`/api/my-stats`, {
        headers,
      });
      const data = await response.json();

      setStatData(data.data[0]);

      setLoading(false);
    } catch (error) {
      console.log("Error fetching categories:", error);
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchData();
    getStats();
  }, [refresh, pageNumber]);
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
    <div className="flex flex-col items-center justify-center h-screen p-2 pt-16 ">
      <div className=" w-full h-full  ">
        <div className="grid grid-cols-1 h-full  gap-4">
          {/* <div className="h-full col-span-1 bg-opacity-10 rounded shadow-md">
            <div className="p-4   ">
              <h3 className="font-bold">Profile</h3>
            </div>
          </div> */}
          <div className="h-full p-4  col-span-1 bg-opacity-10 rounded shadow-md">
            <h3 className="font-bold">Stats</h3>
            <div className="flex p-6 h-full ">
              {/* First Set of Stats */}
              <div className="flex items-center justify-center mr-8">
                <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                  <span className="text-lg">{statData?.totalLikes}</span>
                </div>

                <div className="ml-4">
                  <p>Total video likes</p>
                </div>
              </div>

              {/* Second Set of Stats */}
              <div className="flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                  <span className="text-lg">{statData?.totalVideos}</span>
                </div>

                <div className="ml-4">
                  <p>Total video count</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 bg-blue-900 bg-opacity-10 rounded shadow-md ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full p-4 ">
              <ProfileVideoCard
                thumbnails={thumbnails}
                isAuthenticated={true}
                likeVideo={likeVideo}
                openYouTubeLink={openYouTubeLink}
              />
              <Pagination
                thumbnails={thumbnails}
                pageNumber={pageNumber}
                pageSize={pageSize}
                setPageNum={setPageNum}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
