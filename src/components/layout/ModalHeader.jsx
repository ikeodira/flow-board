import React from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

function ModalHeader({ title, onClose }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h6">{title}</Typography>
      <IconButton onClick={onClose} size="small">
        <Close />
      </IconButton>
    </Stack>
  );
}

export default ModalHeader;
