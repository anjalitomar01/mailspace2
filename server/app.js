// require("dotenv").config();
// const express = require("express");
// const app = express();
// require("./db/conn");
// const router = require("./routes/router");
// const cors = require("cors");
// const cookieParser = require("cookie-parser")
// const port = 8010;


// // app.get("/",(req,res)=>{
// //     res.status(201).json("server created")
// // });

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors());
// app.use(router);


// app.listen(port,()=>{
//     console.log(`server start at port no : ${port}`);
// })


require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const path = require("path");
const fs = require("fs");
// const ContactList = require("./models/ContactList");

const router = require("./routes/router"); 
const contactRoutes = require("./routes/contactRoutes"); // Contact List API

const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 8010;

// Ensure the uploads directory exists
const uploads = path.join(__dirname, "uploads");
if (!fs.existsSync(uploads)) {
    fs.mkdirSync(uploads);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure CORS
app.use(cors({
    origin: "http://localhost:3000", // Change this to your frontend URL (e.g., "http://localhost:3000")
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Serve uploaded files statically
app.use("/uploads", express.static(uploads));

// API Routes
app.use("/api/lists", contactRoutes);
app.use(router); // Moved here to avoid conflicts

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(port, () => {
    console.log(`✅ Server started on port: ${port}`);
});