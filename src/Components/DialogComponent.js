import { Slide } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FileDownloadDoneRoundedIcon from "@mui/icons-material/FileDownloadDoneRounded";
import React, { useState } from "react";

function DialogComponent(props) {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={1000}
      onClose={handleClose}
      TransitionComponent={Slide}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={props.type}
        variant="filled"
        sx={{ width: "100%" }}
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
          error: <ClearRoundedIcon fontSize="inherit" />,
          info: <FileDownloadDoneRoundedIcon fontSize="inherit" />,
        }}
      >
        {props.msg}
      </Alert>
    </Snackbar>
  );
}

export default DialogComponent;
