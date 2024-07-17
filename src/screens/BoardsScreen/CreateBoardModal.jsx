import React, { useState } from "react";
import {
  Dialog,
  Stack,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import ModalHeader from "../../components/layout/ModalHeader";
import { colors } from "../../theme";
import useApp from "../../hooks/useApp";

function CreateBoardModal({ closeModal }) {
  const { createBoard } = useApp();
  const [name, setName] = useState("");
  const [color, setColor] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    try {
      console.log("Button clicked");
      console.log({
        name,
        color,
      });
      setLoading(true);
      await createBoard({ name, color });
      closeModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Dialog open onClose={closeModal} fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Create Board" onClose={closeModal} />
        <Stack my={5} spacing={1}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Board name"
          />
          <Stack spacing={1.5} direction="row">
            <Typography>Color: </Typography>
            {colors.map((clr, index) => (
              <Box
                onClick={() => setColor(index)}
                key={clr}
                sx={{
                  cursor: "pointer",
                  border: color === index ? "4px solid #383838" : "none",
                  outline: `2px solid ${clr}`,
                }}
                height={25}
                width={25}
                backgroundColor={clr}
                borderRadius="50%"
              />
            ))}
          </Stack>
        </Stack>
        <Button disabled={loading} onClick={handleCreate} variant="contained">
          Create
        </Button>
      </Stack>
    </Dialog>
  );
}

export default CreateBoardModal;
