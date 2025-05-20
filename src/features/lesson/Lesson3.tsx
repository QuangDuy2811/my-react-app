import { faker } from '@faker-js/faker';
import { useMemo, useState } from 'react';

const generateMockUsers = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 60 }),
    address: faker.location.streetAddress(),
    birthday: faker.date.birthdate({ mode: 'age', min: 18, max: 60 }),
    sex: faker.person.sex(),
    job: faker.person.jobArea(),
    phone: faker.phone.number(),
    subscription: faker.helpers.arrayElement(['free', 'develop', 'tester']),
    avatar: faker.image.avatar(),
  }));
};

const Lesson3 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const users = useMemo(() => generateMockUsers(100), []);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) =>
      sortOrder === 'asc' ? a.id - b.id : b.id - a.id
    );
  }, [users, sortOrder]);

  const currentUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, sortedUsers]);

  const handleChangePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= maxButtons) {
        for (let i = 1; i <= maxButtons; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage > totalPages - maxButtons) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - maxButtons + 1; i <= totalPages; i++)
          pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages.map((page, i) =>
      typeof page === 'number' ? (
        <button
          key={i}
          onClick={() => handleChangePage(page)}
          className={`px-3 py-1 border rounded ${
            currentPage === page
              ? 'bg-blue-500 text-white border-blue-500'
              : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ) : (
        <span key={i} className="px-3 py-1 text-gray-500">
          ...
        </span>
      )
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Thực hành mockup data</h2>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-sm text-left">
          <thead className="bg-gray-100 font-sans">
            <tr>
              <th
                className="border p-2 cursor-pointer select-none"
                onClick={handleSort}
              >
                <div className="flex items-center gap-1">
                  ID
                  <div className="flex flex-col text-xs leading-none">
                    <span
                      className={`${
                        sortOrder === 'asc'
                          ? 'text-blue-600 font-bold'
                          : 'text-gray-400'
                      }`}
                    >
                      ▲
                    </span>
                    <span
                      className={`${
                        sortOrder === 'desc'
                          ? 'text-blue-600 font-bold'
                          : 'text-gray-400'
                      }`}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              </th>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Birthday</th>
              <th className="border p-2">Sex</th>
              <th className="border p-2">Job Area</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Subscription</th>
              <th className="border p-2">Avatar</th>
              <th className="border p-2">Action</th>
              <th className="border p-2"></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.firstName}</td>
                <td className="border p-2">{user.lastName}</td>
                <td className="border p-2">{user.age}</td>
                <td className="border p-2">{user.address}</td>
                <td className="border p-2">
                  {new Date(user.birthday).toLocaleDateString('vi-VN')}
                </td>
                <td className="border p-2">{user.sex}</td>
                <td className="border p-2">{user.job}</td>
                <td className="border p-2">{user.phone}</td>
                <td className="border p-2">{user.subscription}</td>
                <td className="border p-2">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="border p-2 space-x-2">
                  <button className="hover:text-blue-600">
                    Invite {user.lastName}
                  </button>
                </td>
                <td className="border p-2">
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
        <div className="flex gap-1 items-center">
          <button
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            &lt;
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>

        {/* ITEMS PER PAGE */}
        <div>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // reset về trang đầu
            }}
            className="border px-2 py-1 rounded"
          >
            {[10, 20, 50, 100].map(size => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Lesson3;
