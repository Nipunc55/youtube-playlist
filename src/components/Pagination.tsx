/** @format */

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNumber,
  pageSize,
  setPageNum,
}) => {
  function pageNumberUP() {
    setPageNum((pre: number) => pre + 1);
  }
  function pageNUmberDown() {
    setPageNum((pre: number) => pre - 1);
  }
  return (
    <div className="flex items-center  border-gray-200  px-4 py-3 sm:px-6">
      {pageNumber > 0 && (
        <button
          onClick={pageNUmberDown}
          className="bg-blue-500 bg-opacity-5 text-white px-4 py-2 rounded-md mr-2 "
        >
          {"<<<<"}
        </button>
      )}

      <button
        onClick={pageNumberUP}
        className="bg-blue-500 bg-opacity-5 text-white px-4 py-2 rounded-md ml-2"
      >
        {">>>>"}
      </button>
    </div>
  );
};
export default Pagination;
