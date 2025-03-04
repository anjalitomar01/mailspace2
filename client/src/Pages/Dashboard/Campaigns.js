import React, { useState } from "react";
import TypeFilter from "../../components/TypeFilter";



import {
  Container,
  Tabs,
  Tab,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Link,
} from "@mui/material";
import { Visibility, Pause, Delete, Email, Edit} from "@mui/icons-material";
import FilterDropdown from "../../components/FilterDropdown";



const EmailCampaigns = () => {
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


// tabs
const categories = ["sent", "scheduled", "draft", "recurring", "for_approval"];
const activeCategory = categories[tabValue] || "sent";



  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "Regular",
    submissionTime: new Date().toLocaleString(),
    recipients: 0,
    createdBy: "",
    CreationTime: new Date().toLocaleString(),
    status: "processed",
    category:activeCategory,
  });
 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  

  //tab change Handler (Controls which tab is active)
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


    const handleCreateCampaign = () => {
      const category = categories[tabValue] || "sent";
      const campaignWithCategory = { ...newCampaign, category };
      setCampaigns([...campaigns, campaignWithCategory]);
      setNewCampaign({
        name: "",
        type: "Regular",
        submissionTime: new Date().toLocaleString(),
        recipients: 0,
        ProcessedBy:"",
        CreationTime: new Date().toLocaleString(),
        createdBy: "",
        status: "Processed",
        category,
      });
      handleClose();
    };


  // View Campaign Details
  const handleView = (campaign) => {
    setSelectedCampaign(campaign);
    setViewOpen(true);
  };


  // Pause/Resume Campaign
  const handlePause = (index) => {
    const updatedCampaigns = [...campaigns];
    updatedCampaigns[index].status = updatedCampaigns[index].status === "Paused" ? "Processed" : "Paused";
    setCampaigns(updatedCampaigns);
  };


  //Send Email
  const handleSendEmail = (index) => {
    alert("Email sent to " + campaigns[index].recipients + " recipients!");
  };



  // Delete Campaign
  const handleDelete = (index) => {
    setCampaigns(campaigns.filter((_, i) => i !== index));
  };


  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.category === activeCategory &&
      (campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );



  return (
    <Container>
      <Box>
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        Email Campaigns
      </Typography>
      {/* Common Filters & Search*/}
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <TextField label="Search Campaigns" variant="outlined" size="small" sx={{ width: 300 }}  value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleOpen}>
          + Create Campaign
        </Button>
      </Box> 
      </Box>

      {/* Tabs for Switching Between Sent, Scheduled, etc. */}
      <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
        <Tab label="Sent" />
        <Tab label="Scheduled" />
        <Tab label="Draft" />
        <Tab label="Recurring" />
        <Tab label="For Approval" />
      </Tabs>
<Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  my={2}
  sx={{
    backgroundColor: "#fff", // Light background color
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
  }}
>
  <Box display="flex" alignItems="center">
    <Typography sx={{ fontSize: "14px", color: "#6B7280", marginRight: "8px" }}>
      Filter By
    </Typography>
    <TypeFilter/>
  </Box>

  {/* <Link
    href="#"
    sx={{ fontSize: "14px", color: "#2563EB", textDecoration: "none", cursor: "pointer" }}
  >
    + Manage Filter
  </Link> */}
  <FilterDropdown/>
</Box>



 {/* Tab Content Based on Selected Tab */}
 {/*Sent*/}
 {tabValue === 0 && (
        <Box>
           {/* Campaigns Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Submission Time</TableCell>
              <TableCell>Recipients</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
            {filteredCampaigns.map((campaign, index) => (
              <TableRow key={index}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.type}</TableCell>
                <TableCell>{campaign.submissionTime}</TableCell>
                <TableCell>{campaign.recipients}</TableCell>
                <TableCell>{campaign.createdBy}</TableCell>
                <TableCell>{campaign.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(campaign)}><Visibility /></IconButton>
                  <IconButton onClick={() => handlePause(index)}><Pause /></IconButton>
                  <IconButton onClick={() => handleSendEmail(index)}><Email /></IconButton>
                  <IconButton onClick={() => handleDelete(index)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

          
        </Box>
      )}


{/* Scheduled*/ }
    {tabValue === 1 && (
        <Box>
          {/* Campaigns Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Submission Time</TableCell>
              <TableCell>Recipients</TableCell>
              <TableCell>Created By</TableCell>
              {/* <TableCell>Status</TableCell> */}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
            {filteredCampaigns.map((campaign, index) => (
              <TableRow key={index}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.type}</TableCell>
                <TableCell>{campaign.submissionTime}</TableCell>
                <TableCell>{campaign.recipients}</TableCell>
                <TableCell>{campaign.createdBy}</TableCell>
                {/* <TableCell>{campaign.status}</TableCell> */}
                <TableCell>
                  <IconButton onClick={() => handleView(campaign)}><Visibility /></IconButton>
                  <IconButton onClick={() => handlePause(index)}><Pause /></IconButton>
                  <IconButton onClick={() => handleSendEmail(index)}><Email /></IconButton>
                  <IconButton onClick={() => handleDelete(index)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </Box>
     )}

{/* Draft  */ }
{tabValue === 2 && (
        <Box>
           {/* Campaigns Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Submission Time</TableCell>
              <TableCell>Recipients</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
            {filteredCampaigns.map((campaign, index) => (
              <TableRow key={index}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.type}</TableCell>
                <TableCell>{campaign.submissionTime}</TableCell>
                <TableCell>{campaign.recipients}</TableCell>
                <TableCell>{campaign.createdBy}</TableCell>
                <TableCell>{campaign.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(campaign)}><Visibility /></IconButton>
                  <IconButton onClick={() => handlePause(index)}><Pause /></IconButton>
                  <IconButton onClick={() => handleSendEmail(index)}><Email /></IconButton>
                  <IconButton onClick={() => handleDelete(index)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
         </Box>
      )}


{/*Recurring*/ }
      {tabValue === 3 && (
        <Box>
           {/* Campaigns Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Submission Time</TableCell>
              <TableCell>Recipients</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
            {filteredCampaigns.map((campaign, index) => (
              <TableRow key={index}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.type}</TableCell>
                <TableCell>{campaign.submissionTime}</TableCell>
                <TableCell>{campaign.recipients}</TableCell>
                <TableCell>{campaign.createdBy}</TableCell>
                <TableCell>{campaign.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(campaign)}><Visibility /></IconButton>
                  <IconButton onClick={() => handlePause(index)}><Pause /></IconButton>
                  <IconButton onClick={() => handleSendEmail(index)}><Email /></IconButton>
                  <IconButton onClick={() => handleDelete(index)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

          
        </Box>
      )}

{/*For Approval */}
      {tabValue === 4 && (
        <Box>
           {/* Campaigns Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Creation Time</TableCell>
              <TableCell>Submission Time</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Processed By</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
            {filteredCampaigns.map((campaign, index) => (
              <TableRow key={index}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.type}</TableCell>
                <TableCell>{campaign.CreationTime}</TableCell>
                <TableCell>{campaign.submissionTime}</TableCell>
                <TableCell>{campaign.ProcessedBy}</TableCell>
                <TableCell>{campaign.createdBy}</TableCell>
                <TableCell>{campaign.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(campaign)}><Visibility /></IconButton>
                  <IconButton onClick={() => handlePause(index)}><Pause /></IconButton>
                  <IconButton onClick={() => handleSendEmail(index)}><Email /></IconButton>
                  <IconButton onClick={() => handleDelete(index)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

          
        </Box>
      )}


      {/* Create Campaign Modal */}
       <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, bgcolor: "background.paper", width: 500, margin: "auto", mt: "10%", borderRadius: "8px", maxHeight:"80vh", overflow:"auto" }}>
          <Typography variant="h6">Create Email Campaign</Typography>

          {/* Step 1: Set Parameters */}
           <Box mt={2} p={2} border="1px solid #ccc" borderRadius="8px">
            <Typography variant="subtitle1">1. Set Parameters</Typography>
            <TextField label="Campaign Name" fullWidth margin="normal" value={newCampaign.name} onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })} />
            <Select  fullWidth  value={newCampaign.category} onChange={(e) => setNewCampaign({ ...newCampaign, category: e.target.value })}>
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Notification">Notification</MenuItem>
            </Select>
            <Select fullWidth sx={{ mt: 2 }} value={newCampaign.type} onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value })}>
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="Regular">Regular</MenuItem>
              <MenuItem value="Automated">Automated</MenuItem>
            </Select>
          </Box> 

          {/* Step 2: Upload Recipients */}
           <Box mt={2} p={2} border="1px solid #ccc" borderRadius="8px">
            <Typography variant="subtitle1">2. Upload Recipients</Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 1 }}>Import Recipients</Button>
          </Box>

          {/* Step 3: Upload Temporary Blacklist */}
           <Box mt={2} p={2} border="1px solid #ccc" borderRadius="8px">
            <Typography variant="subtitle1">3. Upload Temporary Blacklist</Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 1 }}>Import Blacklist</Button>
          </Box> 

          {/* Step 4: Create Email Content */}
           <Box mt={2} p={2} border="1px solid #ccc" borderRadius="8px">
            <Typography variant="subtitle1">4. Create Email Content</Typography>
            <TextField label="Email Subject" fullWidth margin="normal" />
            <TextField label="Email Body" fullWidth multiline rows={4} margin="normal" />
          </Box> 
          {/* Submit & Close Buttons */}
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="contained" color="success" onClick={handleCreateCampaign}>Create Campaign</Button>
            <Button variant="contained" color="error" onClick={handleClose}>Close</Button>
          </Box>
        </Box> 
       </Modal> 

     
      {/* View Campaign Modal */}
      <Modal open={viewOpen} onClose={() => setViewOpen(false)}>
        <Box sx={{ p: 4, bgcolor: "background.paper", width: 400, margin: "auto", mt: "10%" }}>
          <Typography variant="h6">Campaign Details</Typography>
          {selectedCampaign && (
            <Box>
              <Typography>Name: {selectedCampaign.name}</Typography>
              <Typography>Type: {selectedCampaign.type}</Typography>
              <Typography>Submission Time: {selectedCampaign.submissionTime}</Typography>
              <Typography>Recipients: {selectedCampaign.recipients}</Typography>
              <Typography>Created By: {selectedCampaign.createdBy}</Typography>
              <Typography>Status: {selectedCampaign.status}</Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default EmailCampaigns;

