// components/VideoForm.tsx
import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { ICourse } from "@/lib/addCourse";

interface CreateCourseProps {
  //   categoryReLoad: (data: Boolean) => void;
}

const CreateCourse: React.FC<CreateCourseProps> = () => {
  const { categoryRefresh } = useStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const { isAuthenticated } = useStore();
  const [formData, setFormData] = useState<ICourse>({
    title: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddCategory(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleAddCategory = async (data: ICourse) => {
    try {
      const token = localStorage.getItem("token");

      // Build the headers object with the token
      const headers = {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      };
      const response = await fetch("/api/course", {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add video");
      }

      const result = await response.json();

      console.log(result.data);
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };
  return (
    <>
      <>
        {isAuthenticated ? (
          <div className="relative top-28 p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Create your course here
                </h3>
                <form onSubmit={handleSubmit}>
                  <input
                    placeholder="Course Title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-2 w-full m-1 text-black"
                  />
                  <input
                    placeholder="Course Description"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2 w-full m-1 text-black"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md m-1"
                  >
                    Create course
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(0%)",
              backgroundColor: "#3498db", // Set your desired background color
              color: "#fff",
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #2980b9", // Set your desired border style
              zIndex: 1000,
            }}
          >
            please login before add category
          </div>
        )}
      </>
    </>
  );
};

export default CreateCourse;
