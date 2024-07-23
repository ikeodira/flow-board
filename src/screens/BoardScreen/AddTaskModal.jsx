import React, { useState } from "react";
import {
  Dialog,
  Typography,
  Stack,
  IconButton,
  Chip,
  OutlinedInput,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalHeader from "../../components/layout/ModalHeader";

function AddTaskModal({ tabName, onClose, addTask }) {
  const [text, setText] = useState("");

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      <Stack p={2}>
        {/*  <Stack
          mb={3}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Add Task</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack> */}
        <ModalHeader title="Add task" onClose={onClose} />
        <Stack mt={3} spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>Status:</Typography>
            <Chip size="small" label={tabName} />
          </Stack>
          <OutlinedInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Task"
          />
          <Button onClick={() => addTask(text)} variant="contained">
            Add Task
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default AddTaskModal;
