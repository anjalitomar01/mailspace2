// list page
import React, { useState } from "react";
import { Popover, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const LastUsedFilter = ({ onApply }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = () => {

    if (selectedDate && onApply) {
      onApply(selectedDate);
    }
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        {/* Dropdown Button */}
        <Button onClick={handleOpen} variant="outlined" className="text-black font-semibold" style={{color:"black"}}>
        Last Used
        </Button>

        {/* Popover (Date Picker + Apply Button) */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <div className="p-4 w-64">
            {/* Date Picker */}
            <DatePicker
              label="Choose Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-3">
              <Button onClick={handleClose}>Close</Button>
              <Button onClick={handleApply} variant="contained" color="primary">
                Apply
              </Button>
            </div>
          </div>
        </Popover>
      </div>
    </LocalizationProvider>
  );
};

export default LastUsedFilter;