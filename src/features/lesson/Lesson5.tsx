import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: string;
  dimensions: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: number;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: string;
  images: string[];
  thumbnail: string;
}

interface Column {
  key: keyof Product | string;
  label: string;
  visible: boolean;
}

const DataTable: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);  
  const [columns, setColumns] = useState<Column[]>([
    { key: "id", label: "ID", visible: true },
    { key: "title", label: "Title", visible: true },
    { key: "description", label: "Description", visible: true },
    { key: "category", label: "Category", visible: true },
    { key: "price", label: "Price", visible: true },
    { key: "discountPercentage", label: "Discount %", visible: true },
    { key: "rating", label: "Rating", visible: true },
    { key: "stock", label: "Stock", visible: true },
    { key: "tags", label: "Tags", visible: true },
    { key: "brand", label: "Brand", visible: true },
    { key: "sku", label: "SKU", visible: true },
    { key: "weight", label: "Weight", visible: true },
    { key: "dimensions", label: "Dimensions", visible: true },
    { key: "warrantyInformation", label: "Warranty", visible: true },
    { key: "shippingInformation", label: "Shipping", visible: true },
    { key: "availabilityStatus", label: "Availability", visible: true },
    { key: "reviews", label: "Reviews", visible: true },
    { key: "returnPolicy", label: "Return Policy", visible: true },
    { key: "minimumOrderQuantity", label: "Min Order Qty", visible: true },
    { key: "meta", label: "Meta", visible: true },
    { key: "images", label: "Images", visible: true },
    { key: "thumbnail", label: "Thumbnail", visible: true },
  ]);
  const [tempColumns, setTempColumns] = useState<Column[]>(columns);
  const [currentPage, setCurrentPage] = useState(1);
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);

  const visibleColumns = useMemo(() => columns.filter((col) => col.visible), [columns]);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchColumnKeyword, setSearchColumnKeyword] = useState("");

  const filteredColumns = tempColumns.filter(col =>
  col.label.toLowerCase().includes(searchColumnKeyword.toLowerCase())
);



  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=194");
      setData(res.data.products);
    } catch (err) {
      console.error("Fetch data error:", err);
    }
  };
  fetchData();

  // Load columns visibility from localStorage nếu có
  const savedCols = localStorage.getItem("visibleColumns");
  if (savedCols) {
    const parsed: Column[] = JSON.parse(savedCols);
    setColumns(parsed);
    setTempColumns(parsed);
  }
}, []);


  // Mỗi lần mở dropdown => reset tempColumns bằng columns hiện tại
  useEffect(() => {
    if (isColumnDropdownOpen) {
      setTempColumns(columns);
    }
  }, [isColumnDropdownOpen, columns]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

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
          onClick={() => setCurrentPage(i)}
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
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  const toggleTempColumn = (key: string) => {
    setTempColumns((prev) =>
      prev.map((col) => (col.key === key ? { ...col, visible: !col.visible } : col))
    );
  };

  // Khi bấm nút Done => cập nhật columns chính và lưu localStorage
  const handleApplyColumns = () => {
    setColumns(tempColumns);
    setIsColumnDropdownOpen(false);
    localStorage.setItem("visibleColumns", JSON.stringify(tempColumns));
  };

  return (
    <div className="mx-auto p-4 overflow-x-auto">
      <h2 className="font-semibold mb-4">Thực hành xử lý bảng + dữ liệu (dynamic table)</h2>

      {/* Toggle columns */}
      <div className="max-w-6xl w-full space-y-2 grid grid-cols-2">
        {/* Header row */}
        <div className="flex items-center justify-between border rounded px-4 py-2 bg-gray-100">
          <span className="text-sm font-medium">Columns</span>
          <button
            className="focus:outline-none"
            onClick={() => setIsColumnDropdownOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transform transition-transform duration-200 ${
                isColumnDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-4 w-full px-2 text-sm">
          <span>
            {Math.min((currentPage - 1) * itemsPerPage + 1, data.length)}-
            {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} items
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              &lt;
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              &gt;
            </button>
          </div>

          <div>
            <select
              className="border px-2 py-1 rounded"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {[10, 20, 30, 50, 80, 100].map((value) => (
                <option key={value} value={value}>
                  {value} / page
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Toggleable content */}
        <div className="relative">
          {isColumnDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg p-3">
              {/* Search input (hiện tại chưa xử lý filter search) */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Columns</label>
                <input
                  type="search"
                  placeholder="Search"
                  className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-200"
                  value={searchColumnKeyword}
                  onChange={(e) => setSearchColumnKeyword(e.target.value)}
                />
              </div>

              {/* Checkbox list in 2 columns */}
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-auto mb-3">
                {filteredColumns.map((col) => (
                  <label key={col.key} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={col.visible}
                      onChange={() => toggleTempColumn(col.key)}
                      className="form-checkbox text-blue-600"
                    />
                    <span className="capitalize">{col.label}</span>
                  </label>
                ))}
                {filteredColumns.length === 0 && (
                  <div className="col-span-2 text-center text-gray-500 text-sm">
                    No columns found
                  </div>
                )}
              </div>
              
              {/* Nút Done */}
              <div className="text-right">
                <button
                  onClick={handleApplyColumns}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto border rounded-lg shadow-lg mt-4">
        <div className="min-w-[800px]">
          <table className="w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {visibleColumns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-600 select-none"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {visibleColumns.map((col) => {
                    const value = item[col.key as keyof Product];
                    return (
                      <td key={col.key} className="px-4 py-2 text-sm text-gray-700 max-w-xs break-words">
                        {col.key === "tags" && Array.isArray(value)
                          ? value.join(", ")
                          : col.key === "images" && Array.isArray(value)
                          ? value.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt="img"
                                className="w-12 h-12 object-cover inline-block mr-1 rounded"
                              />
                            ))
                          : col.key === "thumbnail"
                          ? (
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )
                          : col.key === "description" && typeof value === "string"
                          ? (value.length > 50 ? value.slice(0, 50) + "..." : value)
                          : String(value)}
                      </td>

                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
