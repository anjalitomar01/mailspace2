import React, { useState, useEffect } from "react";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";

const ContactListTable = ({ contacts, fetchContacts }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.listName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, contacts]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === filteredContacts.length ? [] : filteredContacts.map((contact) => contact._id)
    );
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((rowId) => rowId !== id) : [...prevSelected, id]
    );
  };

  // 🔹 Edit Contact API Call
  const handleEdit = async (contact) => {
    const updatedName = prompt("Enter new name:", contact.listName);
    if (!updatedName || updatedName === contact.listName) return; // Avoid updating if name is the same
  
    try {
      const response = await fetch(`http://localhost:8010/api/lists/${contact._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listName: updatedName }),
      });
  
      if (response.ok) {
        alert("Contact updated successfully!");
  
        // Update the contact locally in the filteredContacts state
        setFilteredContacts((prevContacts) =>
          prevContacts.map((item) =>
            item._id === contact._id ? { ...item, listName: updatedName } : item
          )
        );
      } else {
        alert("Failed to update contact.");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };
  

  // 🔹 Delete Contact API Call
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
  
    try {
      const response = await fetch(`http://localhost:8010/api/lists/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("Contact deleted successfully!");
        
        // Remove the deleted contact from the local state without refreshing the page
        setFilteredContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== id)
        );
      } else {
        alert("Failed to delete contact.");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
  

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4 flex items-center border border-gray-300 p-2 rounded-md w-1/3">
        <span className="mr-2">🔍</span>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-1 outline-none"
        />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedRows.length === filteredContacts.length && filteredContacts.length > 0}
              />
            </th>
            <th className="p-2 text-left">ListID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Created On</th>
            <th className="p-2 text-left">Last Used</th>
            <th className="p-2 text-left">Count</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <tr key={contact._id} className="border-b">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(contact._id)}
                    onChange={() => handleCheckboxChange(contact._id)}
                  />
                </td>
                <td className="p-2">{contact.listId}</td>
                <td className="p-2">{contact.listName}</td>
                <td className="p-2">{contact.category}</td>
                <td className="p-2">{moment(contact.createdOn).format("DD-MM-YYYY")}</td>
                <td className="p-2">{contact.lastUsed ? moment(contact.lastUsed).format("DD-MM-YYYY HH:mm:ss") : "N/A"}</td>
                <td className="p-2">Total: {contact.count}</td>
                <td className="p-2 text-green-600">Processed</td>
                <td className="p-2 flex space-x-2">
                  <button
                    className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-all"
                    onClick={() => handleEdit(contact)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-all"
                    onClick={() => handleDelete(contact._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center p-4">No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactListTable;
