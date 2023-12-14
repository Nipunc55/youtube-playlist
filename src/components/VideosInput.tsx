// components/VideoForm.tsx
import { useState, useEffect } from "react";
// Assuming you have a types file with the 'videos' type

interface VideoFormProps {
  onSubmit: (data: video) => void;
  categories: object[];
}

const VideoForm: React.FC<VideoFormProps> = ({ onSubmit, categories }) => {
  const [formData, setFormData] = useState<video>({
    url: "",
    categoryId: null,
    likes: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);

    // Additional logic for closing the popup or resetting form if needed
  };

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
          {categories.map((category: any) => (
            <option key={category?.id} value={category?.id}>
              {category?.category}
            </option>
          ))}
        </select>

        {/* <label className="block mb-4">
          Likes:
          <input
            type="number"
            name="likes"
            value={formData.likes || ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label> */}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md m-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VideoForm;
