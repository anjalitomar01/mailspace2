const mongoose = require("mongoose");
const shortid = require("shortid")

const ContactListSchema = new mongoose.Schema({
  listId: { type: String, default: shortid.generate, unique: true }, 
  listName: { type: String, required: true },
  category: { type: String, required: true },
  filePath: { type: String, default:"" }, // Store uploaded file path   // agar required chahiye toh: true
  count: { type: Number, default: 0 }, 
  createdOn: { type: Date, default: Date.now },
  lastUsed: { type: Date, default: function () { return this.createdOn; } },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  
});
//  formatted date 
ContactListSchema.virtual("formattedCreatedOn").get(function () {
  return new Date(this.createdOn).toLocaleDateString("en-GB");
});

ContactListSchema.virtual("formattedLastUsed").get(function () {
  return this.lastUsed ? new Date(this.lastUsed).toLocaleDateString("en-GB") : "N/A";
});

// Virtuals JSON response 
ContactListSchema.set("toJSON", { virtuals: true });
ContactListSchema.set("toObject", { virtuals: true });


module.exports = mongoose.model("ContactList", ContactListSchema);


