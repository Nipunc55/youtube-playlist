// components/VideoForm.tsx
import { useState, useEffect } from "react";
import { useStore } from "@/store/store";

interface CategoryInputProps {
  //   categoryReLoad: (data: Boolean) => void;
  modalStatus: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ modalStatus }) => {
  const { categoryRefresh } = useStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    categoryName: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddCategory(formData.categoryName);
  };
  useEffect(() => {
    setModalOpen((pre) => !pre);
  }, [modalStatus]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleAddCategory = async (categoryName: categoryName) => {
    try {
      const response = await fetch("/api/add-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryName),
      });

      if (!response.ok) {
        throw new Error("Failed to add video");
      }

      const result = await response.json();
      useStore.setState((prev) => ({
        ...prev,
        categoryRefresh: !categoryRefresh,
      }));
      console.log(result.data);
      if (result.data.status == 400) {
        alert("category already exits!");
      }
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };
  return (
    <>
      {isModalOpen ? (
        <div
          id="popup-modal"
          className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative top-28 p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setModalOpen(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Please Enter Your Category
                </h3>
                <form onSubmit={handleSubmit}>
                  <input
                    placeholder="Category Name"
                    type="text"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleChange}
                    className="border p-2 w-full m-1 text-black"
                  />

                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md m-1"
                  >
                    Add category
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CategoryInput;
