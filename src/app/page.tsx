/** @format */

import CategoryArray from "@/components/CategoryArray";

import ThumNailGrid from "@/components/ThumNailGrid";
import TumbNailContainer from "@/components/TumbNailContainer";

import TestClient from "@/components/testClient";
import { useStore } from "@/store/store";

export default async function Home() {
  //   useStore.setState({ selectedCategoryId: selectedCategoryId });
  return (
    <>
      <CategoryArray />
      <div
        className="flex mt-20 max-h-screen flex-col items-center justify-between "
        style={{ marginTop: "6.4rem" }}
      >
        <TumbNailContainer />
        {/* <TestClient /> */}
      </div>
    </>
  );
}
