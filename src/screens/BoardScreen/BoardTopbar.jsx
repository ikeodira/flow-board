import React from "react";
import { AppBar, Toolbar, Stack, Typography, IconButton } from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

function BoardTopbar() {
  return (
    <AppBar>
      <Toolbar>
        <Stack direction="row">
          <IconButton>
            <BackIcon />
          </IconButton>
          <Typography variant="h6">Board Name</Typography>
        </Stack>
        <Stack direction="row">
          <IconButton>
            <BackIcon />
          </IconButton>
          <Typography variant="h6">Board Name</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default BoardTopbar;
