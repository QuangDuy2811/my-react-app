import { useState } from "react";

const Lesson8 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = 1000;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageButtons = [];
    const maxShown = 5;

    for (let i = 1; i <= Math.min(maxShown, totalPages); i++) {
      pageButtons.push(
        <button
          key={i}
          className={`px-2 py-1 hover:bg-gray-100 rounded ${
            currentPage === i ? "border-blue-500 text-blue-600 font-bold border" : ""
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    if (totalPages > maxShown) {
      pageButtons.push(
        <span key="ellipsis" className="px-2">
          ...
        </span>,
        <button
          key={totalPages}
          className="px-2 py-1 border rounded"
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-start gap-x-6 w-full px-4 py-2 text-sm">
      <span>
        {startItem}-{endItem} of {totalItems} items
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          className="px-2 py-1"
        >
          &lt;
        </button>

        {renderPageNumbers()}

        <button
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
          className="px-2 py-1"
        >
          &gt;
        </button>
      </div>

      <div className="ml-6">
        <select
          className="border px-2 py-1 rounded"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); // reset page khi đổi limit
          }}
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={30}>30 / page</option>
          <option value={50}>50 / page</option>
          <option value={80}>80 / page</option>
          <option value={100}>100 / page</option>
        </select>
      </div>
    </div>
  );
};

export default Lesson8;
