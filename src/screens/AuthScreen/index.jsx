import React, { useState } from "react";
import { Container, Stack, Button, Typography, TextField } from "@mui/material";
import LogoImg from "../../assets/logo.svg";
import ImageEl from "../../components/utils/imageEl";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import useStore from "../../store";

const initForm = {
  email: "",
  password: "",
};

function AuthScreen() {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initForm);
  const { setToastr } = useStore();

  const authText = isLogin
    ? "Do not have an account?"
    : "Already have an account?";

  const handleChange = (event) => {
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAuth = async () => {
    try {
      setLoading(true);
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        setLoading(false);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
        setLoading(false);
      }
    } catch (error) {
      const msg = error.code.split("auth/")[1].split("-").join(" ");
      setToastr(msg);
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 10,
      }}
    >
      <Stack mb={6} spacing={4} alignItems={["center"]} textAlign="center">
        <ImageEl src={LogoImg} alt="FlowBoard logo" />
        <Typography color="rgba(255, 255, 255, .6)">
          Visualize Your Workflow for Increased Productivity. <br />
          Access Your Tasks Anytime, Anywhere
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <TextField
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
        />
        <TextField
          value={form.password}
          name="password"
          onChange={handleChange}
          label="Password"
        />
        <Button
          disabled={loading || !form.email.trim() || !form.password.trim()}
          size="large"
          variant="contained"
          onClick={handleAuth}
        >
          {isLogin ? "Login" : "Register"}
        </Button>
      </Stack>
      <Typography
        onClick={() => setIsLogin((isLogin) => !isLogin)}
        sx={{
          cursor: "pointer",
        }}
        textAlign="center"
        mt={3}
      >
        {authText}
      </Typography>
    </Container>
  );
}

export default AuthScreen;
