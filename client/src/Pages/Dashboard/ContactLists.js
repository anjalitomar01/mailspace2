import React, { useEffect, useState } from "react";
import API from "../../api/contactApi";
import ContactListTable from "../../components/ContactListTable";
import CreateListModal from "../../components/CreateListModal";
import CategoryFilter from "../../components/CategoryFilter";
import DateFilter from "../../components/DateFilter";
import LastUsedFilter from "../../components/LastUsedFilter";



const ContactLists = () => {
  const [showModal, setShowModal] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await API.get("/api/lists");

      console.log("API response:", response.data);

      if (response.data && response.data.data) {
        setLists(response.data.data);
        setFilteredContacts(response.data.data);

        //  Extract unique categories dynamically
        const uniqueCategories = [...new Set(response.data.data.map((c) => c.category))];
        setCategories(uniqueCategories);
      } else {
        setLists([]);
        setFilteredContacts([]);
      }
    }
    catch (error) {
      console.error("Error fetching contacts:", error);
      setLists([]); // Prevent `undefined`
      setFilteredContacts([]);

    }
  };

  // Filter Data Based on Selected Categories
  const handleCategoryApply = (selectedCategories) => {
    if (selectedCategories.length === 0) {
      setFilteredContacts(lists);
    } else {
      setFilteredContacts(
        lists.filter((contact) => selectedCategories.includes(contact.category))
      );
    }
  };
  // Filter data based on selected creation date
  const handleDateApply = async (selectedDate) => {
    try {
      if (!selectedDate) {
        setFilteredContacts(lists);
        return;
      }

      const formattedDate = selectedDate.format("YYYY-MM-DD");
      const response = await API.get(`/api/lists?createdOn=${formattedDate}`);
      setFilteredContacts(response.data?.data || response.data);
    } catch (error) {
      console.error("Error filtering contacts by date:", error);
    }
  };

  // Filter data based on "Last Used" date
  const handleLastUsedApply = async (selectedDate) => {
    try {
      if (!selectedDate) {
        setFilteredContacts(lists);
        return;
      }

      const formattedDate = selectedDate.format("YYYY-MM-DD");
      const response = await API.get(`/api/lists?lastUsed=${formattedDate}`);
      setFilteredContacts(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Error filtering contacts by last used date:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Lists</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={() => setShowModal(true)}
        >
          + Create List
        </button>
      </div>


      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center gap-4">
        {/* <FilterBar /> */}
        <CategoryFilter categories={categories} onApply={handleCategoryApply} />
        <DateFilter setFilteredData={handleDateApply} /> {/* Add Date Filter */}
        <LastUsedFilter onApply={handleLastUsedApply} /> {/* Add Last Used Filter */}

      </div>
      {/* Table Displaying Lists */}
      <ContactListTable contacts={filteredContacts} />
      {/* Create List Modal */}
      {showModal && <CreateListModal onClose={() => setShowModal(false)} onCreate={fetchLists} />}
      {/* Filters & Search */}

    </div>

  );
};

export default ContactLists;