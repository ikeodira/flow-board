import { Stack, CircularProgress } from "@mui/material";
import React from "react";

function AppLoader() {
  return (
    <Stack mt={10} alignItems="center">
      <CircularProgress />
    </Stack>
  );
}

export default AppLoader;
