/** @format */

import ThumNailGrid from "@/components/ThumNailGrid";
import TumbNailContainer from "@/components/TumbNailContainer";

export default async function Course({ params }: { params: { id: string } }) {
  const courseId = params.id;

  console.log("Component rendered with ID:", courseId);
  //   useStore.setState({ selectedCategoryId: selectedCategoryId });
  return (
    <>
      <div
        className="flex mt-20 max-h-screen flex-col items-center justify-between "
        style={{ marginTop: "6.4rem" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full p-4 ">
          <ThumNailGrid courseId={courseId} />
          {/* <CourseGrid reload={loaded} /> */}
        </div>
        {/* <TestClient /> */}
      </div>
    </>
  );
}
