import React, { useEffect, useState } from "react";
import API from "../../api/contactApi";
import ContactListTable from "../../components/ContactListTable";
import CreateListModal from "../../components/CreateListModal";
import CategoryFilter from "../../components/CategoryFilter";
import DateFilter from "../../components/DateFilter";
import LastUsedFilter from "../../components/LastUsedFilter";

const ContactLists = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false); // State for showing the filter panel
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lists, setLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [selectedLastUsed, setSelectedLastUsed] = useState(null);

  useEffect(() => {
    fetchLists(currentPage);
  }, [currentPage]);

  const fetchLists = async (page) => {
    try {
      let query = `http://localhost:8010/api/lists?page=${page}&limit=${pageSize}`;

      if (selectedCategory) {
        query += `&category=${selectedCategory}`;
      }
      if (selectedDateRange) {
        query += `&startDate=${selectedDateRange.start}&endDate=${selectedDateRange.end}`;
      }
      if (selectedLastUsed) {
        query += `&lastUsed=${selectedLastUsed}`;
      }

      const response = await API.get(query);
      if (response.data && response.data.data) {
        setLists(response.data.data);
        setFilteredContacts(response.data.data);
        setTotalPages(response.data.totalPages);

        const uniqueCategories = [...new Set(response.data.data.map((c) => c.category))];
        setCategories(uniqueCategories);
      } else {
        setLists([]);
        setFilteredContacts([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setLists([]);
      setFilteredContacts([]);
      setTotalPages(1);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleLastUsedChange = (lastUsed) => {
    setSelectedLastUsed(lastUsed);
  };

  // Function to show the filter panel
  const handleManageFilterClick = () => {
    setShowFilterPanel(true); // Show the filter panel when clicking "Manage Filters"
  };

  // Function to close the filter panel
  const handleCloseFilterPanel = () => {
    setShowFilterPanel(false); // Hide the filter panel
  };

  // Function to apply filters and fetch the updated list
  const handleApplyFilters = () => {
    fetchLists(1); // Fetch data based on selected filters
    handleCloseFilterPanel(); // Close the filter panel
  };

  // Function to show the Create List modal
  const handleCreateListClick = () => {
    setShowModal(true); // Open the Create List Modal
    handleCloseFilterPanel(); // Optionally, close the filter panel when opening the Create List Modal
  };

  return (
    <div className="p-6 bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Lists</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={handleCreateListClick}
        >
          + Create List
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center gap-4">
        <CategoryFilter categories={categories} onApply={handleCategoryChange} />
        <DateFilter setFilteredData={handleDateRangeChange} />
        <LastUsedFilter onApply={handleLastUsedChange} />
        
        {/* Manage Filters Button */}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={handleManageFilterClick}
        >
          Manage Filters
        </button>
      </div>

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Apply Filters</h3>

            {/* Category Filter */}
            <div className="mb-4">
              <CategoryFilter categories={categories} onApply={handleCategoryChange} />
            </div>

            {/* Date Filter */}
            <div className="mb-4">
              <DateFilter setFilteredData={handleDateRangeChange} />
            </div>

            {/* Last Used Filter */}
            <div className="mb-4">
              <LastUsedFilter onApply={handleLastUsedChange} />
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={handleCloseFilterPanel}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </button>
             
            </div>
          </div>
        </div>
      )}

      {/* Table Displaying Lists */}
      <ContactListTable contacts={filteredContacts} />

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span> Page {currentPage} of {totalPages} </span>

        <button
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Create List Modal */}
      {showModal && <CreateListModal onClose={() => setShowModal(false)} onCreate={() => fetchLists(1)} />}
    </div>
  );
};

export default ContactLists;
