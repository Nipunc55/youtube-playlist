import CourseContainer from "@/components/CourseContainer";

export default async function Home() {
  //   useStore.setState({ selectedCategoryId: selectedCategoryId });
  return (
    <>
      {/* <CategoryArray /> */}
      <div
        className="flex mt-20 max-h-screen flex-col items-center justify-between "
        style={{ marginTop: "6.4rem" }}
      >
        <CourseContainer />
        {/* <TestClient /> */}
      </div>
    </>
  );
}
