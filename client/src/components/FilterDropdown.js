import { useState, useRef, useEffect } from "react";
import { BsPlus } from "react-icons/bs";

const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(["Type"]);
  const allFilters = ["Type", "Category", "Status", "Created On", "Last Used"];
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredFilters = allFilters.filter((filter) =>
    filter.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  const selectAll = () => setSelectedFilters(allFilters);
  const clearAll = () => setSelectedFilters([]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Manage Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-blue-600 font-medium"
      >
        <BsPlus className="mr-1" />
        Manage Filter
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg">
          {/* Search Input */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Search Filters"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-1 border rounded-md outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Filter Options */}
          <div className="max-h-40 overflow-y-auto p-2">
            {filteredFilters.map((filter) => (
              <label key={filter} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(filter)}
                  onChange={() => toggleFilter(filter)}
                  className="w-4 h-4 text-blue-500"
                />
                <span>{filter}</span>
              </label>
            ))}
          </div>

          {/* Select All & Clear Buttons */}
          <div className="flex justify-between p-2 border-t">
            <button onClick={selectAll} className="text-blue-600 font-medium">
              Select All
            </button>
            <button onClick={clearAll} className="text-blue-600 font-medium">
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;

