// contact list page
import React, { useState } from "react";
import axios from "../api/contactApi";
import API from "../api/contactApi";

const CreateListModal = ({ onClose, onCreate }) => {
  const [listName, setListName] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
const [isSubmitting,setIsSubmitting]=useState(false);


  const handleSubmit = async () => {
    if (!listName || !category) {
      alert("List Name and Category are required!");
      return;
    }

    const formData = new FormData();
    formData.append("listName", listName);
    formData.append("category", category);
    if (file) formData.append("file", file);
    setIsSubmitting(true); // Disable button while submitting

    try {
      const response = await API.post("/api/lists", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("List Created Successfully!");
        onCreate();  // Refresh the list
        onClose();   // Close the modal
      } else {
        alert("Error Creating List");
      }
    } catch (error) {
      console.error("Error creating list:", error);
      alert("Failed to connect to the server.");
    }finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h3 className="text-lg font-semibold mb-4">Create New List</h3>

        <label className="block text-sm font-medium mb-1">List Name:</label>
        <input
          type="text"
          placeholder="Enter List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />

        <label className="block text-sm font-medium mb-1">Category:</label>
        <input
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />

        <label className="block text-sm font-medium mb-1">Upload File (Optional):</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 border rounded-md mb-4"
        />

        <div className="flex justify-end space-x-2">
          <button onClick={handleSubmit} disabled={isSubmitting}  className={`px-4 py-2 rounded-md text-white ${
              isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600"
            }`}>
            
          {isSubmitting ? "Creating..." : "Create"}
          </button>
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListModal;