import { useState, useRef, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";

const TypeFilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const dropdownRef = useRef(null);

  const typeOptions = [
    "Regular",
    "Split A/B",
    "Split A/B/C",
    "Split A/B/C/D",
    "Split A/B/C/D/E",
  ];

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

  // Filter options based on search input
  const filteredTypes = typeOptions.filter((type) =>
    type.toLowerCase().includes(search.toLowerCase())
  );

  const toggleTypeSelection = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700"
      >
        Type <BsChevronDown className="ml-2 text-gray-500" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg">
          {/* Search Input */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Select Type"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-1 border rounded-md outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Type Options */}
          <div className="max-h-40 overflow-y-auto p-2">
            {filteredTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleTypeSelection(type)}
                  className="w-4 h-4 text-blue-500"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          {/* Close & Apply Buttons */}
          <div className="flex justify-between p-2 border-t">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-gray-600 border border-gray-300 rounded-md"
            >
              Close
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-white bg-blue-600 rounded-md"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeFilterDropdown;


