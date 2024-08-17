"use client";
import React from "react";
import "../videoCards/ribbon.css";
import extractYouTubeVideoId from "@/utils/thumbNailExtracter";
import { useRouter } from "next/navigation";

interface VideoCardProps {
  course: any;
  isAuthenticated: Boolean;
  likeVideo: (videoId: number) => void;
  openYouTubeLink: (course: any) => void;
}
// Functional Component
const CourseCard: React.FC<VideoCardProps> = ({
  course,
  isAuthenticated,
  likeVideo,
  openYouTubeLink,
}) => {
  const router = useRouter();

  const openCoursePage = (courseId: string) => {
    router.push(`/course/${courseId}`);
  };
  return (
    <>
      <div
        key={course._id}
        className="w-full relative group bg-gray-800 rounded-md overflow-hidden transform transition-transform duration-300 cursor-pointer m-1"
      >
        <div className="w-full  flex flex-row items-start">
          <div className="h-[200px] flex flex-col">
            {course?.videos?.map((thumbnail: any, index: number) => (
              <img
                key={index}
                src={extractYouTubeVideoId(thumbnail.videoUrl) || ""}
                alt={"Video thumbnail"}
                style={{
                  position: "absolute",
                  top: "0",
                  left: `${index * 50}px`,
                  height: "200px",
                  borderRadius: "8px",
                  width: "auto",
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col p-4 gap-3 text-white ml-auto">
            <h2 className="text-xl font-bold mb-2">{course.title} </h2>
            <p
              className="text-sm text-gray-3
            00"
            >
              {course.description}
            </p>
          </div>
        </div>
        {isAuthenticated ? (
          <div className="absolute inset-0 opacity-0 bg-black bg-opacity-50 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
            {course.hasLike ? (
              <button
                onClick={() => likeVideo(course.id)}
                className="absolute bottom-0 right-0 z-10  text-white px-4 py-2 rounded-full"
              >
                <svg
                  className="fill-cyan-500 hover:fill-cyan-700"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => likeVideo(course.id)}
                className="absolute bottom-0 right-0 z-10  text-white px-4 py-2 rounded-full"
              >
                <svg
                  className="fill-cyan-700"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z" />
                </svg>
              </button>
            )}
            <button
              onClick={() => openCoursePage(course._id)}
              className="absolute bottom-0 left-0 z-10 bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Open
            </button>

            {/* Content inside the overlay */}
            <p className="text-white">likes: {course.likes}</p>
          </div>
        ) : (
          <div className="absolute inset-0 opacity-0 bg-black bg-opacity-50 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
            <button
              onClick={() => openCoursePage(course._id)}
              className="absolute bottom-0 left-0 z-10 bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Open
            </button>

            {/* Content inside the overlay */}
            <p className="text-white">likes: {course.likes}</p>
            <p className="text-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              login to like and add videos
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseCard;
