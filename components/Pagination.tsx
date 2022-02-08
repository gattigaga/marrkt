import React from "react";
import Paginate from "react-paginate";

type PaginationProps = {
  initialPage?: number;
  totalPages: number;
  onPageChange?: (selectedItem: { selected: number }) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  initialPage,
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
        initialPage={initialPage}
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
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Pagination;
