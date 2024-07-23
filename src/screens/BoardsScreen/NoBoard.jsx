import React from "react";
import { Stack, Typography } from "@mui/material";

function NoBoards() {
  return (
    <Stack textAlign="center" mt={5} spacing={1}>
      <Typography variant="h5">No Boards Created</Typography>
      <Typography>Create your first board today!</Typography>
    </Stack>
  );
}

export default NoBoards;
