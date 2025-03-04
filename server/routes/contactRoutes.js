const express = require("express");
const router = express.Router();
const ContactList = require("../models/ContactList");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploads = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploads)) {
  fs.mkdirSync(uploads, { recursive: true });
}

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create a new contact list
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { listName, category } = req.body;
    if (!listName || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const contactCount = req.file ? await countContactsFromFile(req.file.path) : 0;

    const newList = new ContactList({
      listName,
      category,
      filePath: req.file ? req.file.path : "",
      count: contactCount,
    });

    await newList.save();
    res.status(201).json({ message: "List created successfully", newList });
  } catch (error) {
    console.error("Error creating list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all lists with pagination, filtering & search
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const totalItems = await ContactList.countDocuments();
    const totalPages = Math.ceil(totalItems / limitNum);

    const lists = await ContactList.find({})
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.json({
      data: lists,
      currentPage: pageNum,
      totalPages: totalPages,
      totalItems: totalItems,
    });
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ message: error.message });
  }
});

// 📝 Edit Contact List (Update Name)
router.put("/:id", async (req, res) => {
  try {
    const { listName } = req.body;
    if (!listName) {
      return res.status(400).json({ error: "List name is required" });
    }

    const updatedList = await ContactList.findByIdAndUpdate(req.params.id, { listName }, { new: true });
    if (!updatedList) return res.status(404).json({ error: "List not found" });

    res.status(200).json({ message: "Contact updated successfully", updatedList });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🗑️ Delete Contact List
router.delete("/:id", async (req, res) => {
  try {
    const deletedList = await ContactList.findByIdAndDelete(req.params.id);
    if (!deletedList) return res.status(404).json({ error: "List not found" });

    if (deletedList.filePath) {
      fs.unlinkSync(deletedList.filePath); // Delete the file after deletion
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
