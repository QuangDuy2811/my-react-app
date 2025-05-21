import React, { useState } from 'react';

const Lesson6: React.FC = () => {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [mainFilter, setMainFilter] = useState({ column: '', condition: 'is', text: '' });
  const [extraFilters, setExtraFilters] = useState<
    { column: string; condition: string; text: string; logic: 'and' | 'or' }[]
  >([]);

  const handleFilter = () => {
    console.log('Search:', search);
    console.log('Tag:', tag);
    console.log('Main filter:', mainFilter);
    console.log('Extra filters:', extraFilters);
  };

  const handleClear = () => {
    setSearch('');
    setTag('');
    setMainFilter({ column: '', condition: 'is', text: '' });
    setExtraFilters([]);
  };

  const handleAddFilter = () => {
    setExtraFilters((prev) => [...prev, { column: '', condition: 'is', text: '', logic: 'and' }]);
  };

  const handleExtraFilterChange = (
    index: number,
    field: 'column' | 'condition' | 'text' | 'logic',
    value: string
  ) => {
    const updated = [...extraFilters];
    if (field === 'logic') {
        updated[index][field] = value as 'and' | 'or';
        } else {
        updated[index][field] = value;
        }
    setExtraFilters(updated);   
  };

  return (
    <div className="max-w-6xl  p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Thực hành extend form</h2>

      {/* Row 1: Search and Tag */}
      <div className="flex gap-6 mb-6">
        <div className="flex-1">
          <label className="block mb-1 text-gray-500">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded px-3 py-2 "
            placeholder="Search..."
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">Tag</label>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="" disabled hidden>Tag</option>
            <option value="Tag1">TagAlpha</option>
            <option value="Tag2">TagBeta</option>
            <option value="Tag3">TagGamma</option>
            <option value="Tag4">TagDelta</option>
            <option value="Tag5">TagEpsilon</option>
            <option value="Tag6">TagZeta</option>
            <option value="Tag7">TagEta</option>
            <option value="Tag8">TagTheta</option>
            <option value="Tag9">TagIota</option>
            <option value="Tag10">TagKappa</option>
          </select>
        </div>
      </div>

      {/* Row 2: Main Filter */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-500">Show Only Records With</label>
        <div className="flex gap-4">
          <select
            value={mainFilter.column}
            onChange={(e) => setMainFilter({ ...mainFilter, column: e.target.value })}
            className="w-1/3 border border-gray-300 rounded px-3 py-2"
          >
            <option value="" disabled hidden>Columns</option>
            <option value="Column1">Column1</option>
            <option value="Column2">Column2</option>
            <option value="Column3">Column3</option>
          </select>
          <span>That</span>
          <select
            value={mainFilter.condition}
            onChange={(e) => setMainFilter({ ...mainFilter, condition: e.target.value })}
            className="w-1/3 border border-gray-300 rounded px-3 py-2"
          >
            <option value="is">IS</option>
            <option value="isnot">IS NOT</option>
            <option value="contains">CONTAINS</option>

          </select>
          <input
            type="text"
            value={mainFilter.text}
            onChange={(e) => setMainFilter({ ...mainFilter, text: e.target.value })}
            className="w-1/3 border border-gray-300 rounded px-3 py-2"
            placeholder="Text"
          />
        </div>
      </div>

      {/* Extra Filters */}
      {extraFilters.map((filter, index) => (
        <div key={index} className="mb-4 border-t pt-4">
          <div className="flex items-center gap-4 mb-2">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name={`logic-${index}`}
                value="and"
                checked={filter.logic === 'and'}
                onChange={(e) => handleExtraFilterChange(index, 'logic', e.target.value)}
              />
              And
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name={`logic-${index}`}
                value="or"
                checked={filter.logic === 'or'}
                onChange={(e) => handleExtraFilterChange(index, 'logic', e.target.value)}
              />
              Or
            </label>
          </div>
          <div className="flex gap-4">
            <select
              value={filter.column}
              onChange={(e) => handleExtraFilterChange(index, 'column', e.target.value)}
              className="w-1/3 border border-gray-300 rounded px-3 py-2"
            >
              <option value="" disabled hidden >Columns</option>
              <option value="Column1">Column1</option>
              <option value="Column2">Column2</option>
              <option value="Column3">Column3</option>
            </select>
            <span>That</span>
            <select
              value={filter.condition}
              onChange={(e) => handleExtraFilterChange(index, 'condition', e.target.value)}
              className="w-1/3 border border-gray-300 rounded px-3 py-2"
            >
              <option value="is">IS</option>
              <option value="isnot">IS NOT</option>
              <option value="contains">CONTAINS</option>
            </select>
            <input
              type="text"
              value={filter.text}
              onChange={(e) => handleExtraFilterChange(index, 'text', e.target.value)}
              className="w-1/3 border border-gray-300 rounded px-3 py-2"
              placeholder="Text"
            />
          </div>
        </div>
      ))}

      {/* + More Filter */}
      <button
        type="button"
        onClick={handleAddFilter}
        className="text-gray-500 mb-6"
      >
        + More Filter
      </button>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleFilter}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Filter
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>
      {/* Table */}
      <div className="mt-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">Filter</th>
              <th className="border border-gray-300 px-2 py-1">Tags</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-1">Example Filter</td>
              <td className="border border-gray-300 px-2 py-1">Example Tag</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lesson6;
