// for category list page

import React, { useState } from "react";

const CategoryFilter = ({ categories, onApply }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Category Selection Handler
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Apply Filter
  const handleApply = () => {
    onApply(selectedCategories);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Category Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-white border rounded-md"
      >
        Category
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bg-white shadow-lg p-4 w-60 mt-2 rounded-md z-10">
          <input
            type="text"
            placeholder="Select Category"
            className="w-full p-2 border rounded-md mb-2"
          />

          <div className="max-h-40 overflow-y-auto">
            {categories.map((category) => (
              <label key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-2 space-x-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-1 bg-gray-400 text-white rounded-md"
            >
              Close
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-1 bg-blue-600 text-white rounded-md"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
