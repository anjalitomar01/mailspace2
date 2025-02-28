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
  filename:(req, file, cb)=> {
    cb(null, Date.now() + "-" + file.originalname); 
  
  },
});

const upload = multer({ storage: storage });

// Create a new contact list
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { listName, category } = req.body;
    if (!listName || !category /*|| !req.file*/) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Get the number of contacts from the uploaded file
    const contactCount =req.file? await countContactsFromFile(req.file.path):0;

    // Save to database
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

// Function to count contacts from a file (Basic CSV/TXT line count)
const countContactsFromFile = async (filePath) => {
  const fs = require("fs");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n").filter((line) => line.trim() !== ""); 
    return lines.length;
  } catch (error) {
    console.error("Error reading file:", error);
    return 0;
  }
};



// Fetch all lists with optional date filtering & search
router.get("/", async (req, res) => {
  
    try {

    const { createdOn,lastUsed,search} = req.query;
    let filter = {};

    // Date filter
    if (createdOn) {
      filter.createdOn = {
        $gte: new Date(createdOn), 
        $lt: new Date(new Date(createdOn).setDate(new Date(createdOn).getDate() + 1)), 
      };
    }

    if (lastUsed) {
      filter.lastUsed = {
        $gte: new Date(lastUsed),
        $lt: new Date(new Date(lastUsed).setDate(new Date(lastUsed).getDate() + 1)),
      };
    }
    
// search by listName or category
if (search) {
  filter.$or = [
    { listName: { $regex: search, $options: "i" } }, 
    { category: { $regex: search, $options: "i" } },
  ];
}

const lists = await ContactList.find(filter);
      res.json({
        data: lists,
      });
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ message: error.message });
  }
});
    

// Get contacts with optional lastUsed filter
router.get("/lists", async (req, res) => {
  try {
    let query = {};

    if (req.query.lastUsed) {
      const selectedDate = new Date(req.query.lastUsed);
      query.lastUsed = {
        $gte: selectedDate,
        $lt: new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000) // Next day
      };
    }

    const lists = await ContactList.find(query);
    res.json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ message: "Server Error" });
  }
 
});

module.exports = router;
