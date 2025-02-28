// date filter for list page

import React, { useState } from "react";
import { Button, Popover, TextField } from "@mui/material";
import {LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";


const DateFilter = ({ setFilteredData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = () => {
    setFilteredData(selectedDate); // Apply the selected date filter
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div >
        <Button style={{color:"black", border:"2px grey"}} onClick={handleOpen}>
          Created On
        </Button>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <div style={{ padding: 10 }}>
            <DatePicker
              label="Choose Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            //   renderInput={(params) => <TextField {...params} />}
            slotProps={{ textField: { fullWidth: true } }} // Correct way to use TextField
            />
            <div style={{ marginTop: 10 }}>
              <Button onClick={handleClose}>Close</Button>
              <Button onClick={handleApply} color="primary">
                Apply
              </Button>
            </div>
          </div>
        </Popover>
      </div>
    </LocalizationProvider>
  );
};

export default DateFilter;