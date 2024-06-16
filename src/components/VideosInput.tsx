// components/VideoForm.tsx
import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import toast, { Toaster } from "react-hot-toast";
interface VideoFormProps {
  onSubmit: (data: video) => void;
  categories: object[];
}

const VideoForm: React.FC<VideoFormProps> = ({ onSubmit, categories }) => {
  const { selectedCategoryId } = useStore();
  const [formData, setFormData] = useState<video>({
    url: "",
    categoryId: selectedCategoryId,
    likes: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name == "url") {
      updatedValue = value.split("&")[0];
    }
    setFormData((prevData: any) => ({ ...prevData, [name]: updatedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url.trim()) {
      // Display an error message or perform some action
      console.error("URL cannot be empty");
      toast.error("URL cannot be empty");
      return;
    }
    onSubmit(formData);
    formData.url = "";
  };
  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      categoryId: selectedCategoryId,
    }));
  }, [selectedCategoryId]);
  console.log(selectedCategoryId);

  return (
    <div className="bg-white p-6 rounded-md shadow-md text-center text-gray-800">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Video URL:"
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className="border p-2 w-full m-1"
        />

        <select
          placeholder="Category:"
          name="categoryId"
          value={formData.categoryId || ""}
          onChange={handleChange}
          className="border p-2 w-full m-1"
        >
          <option value="">Select a category</option>
          {categories.length > 0 &&
            categories?.map((category: any) => (
              <option key={category?._id} value={category?._id}>
                {category?.category}
              </option>
            ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md m-1"
        >
          Add Video
        </button>
      </form>
    </div>
  );
};

export default VideoForm;
