import React from "react";
import Paginate from "react-paginate";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageIndex: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div>
      <Paginate
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        pageRangeDisplayed={5}
        forcePage={currentPage - 1}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        pageClassName="inline"
        breakClassName="inline"
        previousClassName="inline"
        nextClassName="inline"
        pageLinkClassName="text-xs text-black px-3 py-1"
        breakLinkClassName="text-xs text-black px-3 py-1"
        previousLinkClassName="text-sm text-black pr-3 py-1"
        nextLinkClassName="text-sm text-black pl-3 py-1"
        activeLinkClassName="bg-black text-white"
        disabledLinkClassName="text-gray-500"
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        disableInitialCallback
      />
    </div>
  );
};

export default Pagination;
