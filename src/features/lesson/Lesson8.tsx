import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
};

const Lesson8 = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // ✅ Gọi toàn bộ API về
  useEffect(() => {
    const fetchAllProducts = async () => {
      const limit = 30;
      const total = 194;
      const requests = [];

      for (let skip = 0; skip < total; skip += limit) {
        requests.push(fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`));
      }

      const responses = await Promise.all(requests);
      const data = await Promise.all(responses.map((res) => res.json()));
      const allProducts = data.flatMap((d) => d.products);

      setProducts(allProducts);
    };

    fetchAllProducts();
  }, []);

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

  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = startItem + itemsPerPage;
  const currentItems = products.slice(startItem, endItem);

  return (
    <div className="p-4 space-y-4 text-sm">
      <div className="flex items-center justify-between">
        <span>
          {startItem + 1}-{Math.min(endItem, totalItems)} of {totalItems} items
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className="px-2 py-1 border rounded"
          >
            &lt;
          </button>
          {renderPageNumbers()}
          <button
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            className="px-2 py-1 border rounded"
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

      {/* ✅ Table hiển thị 10 cột đầu tiên */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Title</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Discount</th>
              <th className="border px-2 py-1">Rating</th>
              <th className="border px-2 py-1">Stock</th>
              <th className="border px-2 py-1">Brand</th>
              <th className="border px-2 py-1">Category</th>
              <th className="border px-2 py-1">Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="border px-2 py-1">{item.id}</td>
                <td className="border px-2 py-1">{item.title}</td>
                <td className="border px-2 py-1">{item.description}</td>
                <td className="border px-2 py-1">${item.price}</td>
                <td className="border px-2 py-1">{item.discountPercentage}%</td>
                <td className="border px-2 py-1">{item.rating}</td>
                <td className="border px-2 py-1">{item.stock}</td>
                <td className="border px-2 py-1">{item.brand}</td>
                <td className="border px-2 py-1">{item.category}</td>
                <td className="border px-2 py-1">
                  <img src={item.thumbnail} alt={item.title} className="h-10 w-10 object-cover" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lesson8;
