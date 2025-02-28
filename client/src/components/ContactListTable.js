// contact listpage

import React from "react";
import { useState, useEffect } from "react";
import moment from 'moment';

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

  useEffect(() => {
    console.log("Updated Filtered Contacts", filteredContacts);
  }, [filteredContacts]);




  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectAll = () => {

    setSelectedRows(
      selectedRows.length === filteredContacts.length ? [] : filteredContacts.map((contact) => contact._id)
    );
  };

  //  Single Row Select/Deselect Function
  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };


  return (
    <div>
      {/* 🔹 Search Bar */}
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
                checked={selectedRows.length > 0 && selectedRows.length === filteredContacts.length}
              />

            </th>

            <th className="p-2 text-left">ListID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Created On</th>
            <th className="p-2 text-left">Last Used</th>
            <th className="p-2 text-left">Count</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Action</th>
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
                <td className="p-2">{contact.lastUsed ? moment(contact.lastUsed).format("DD_MM_YYYY HH:mm:ss") : "N/A"}</td>
                <td className="p-2">Total: {contact.count}</td>
                <td className="p-2 text-green-600">Processed</td>
                <td className="p-2">⚙️</td>
              </tr>
            ))
          ) : (<tr>
            <td colSpan="9" className="text-center p-4">
              No results found
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}



export default ContactListTable;