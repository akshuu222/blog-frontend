import {
  Box,
  Button,
  Divider,
  Icon,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../Slices/userApiSlice";
import { setCredentials } from "../Slices/authSlices";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = await login({ email, password }).unwrap();
      dispatch(setCredentials(user));
      navigate("/");
      toast.success("Logined Successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <Box
      sx={{
        margin: "5rem auto",
        padding: "1rem",
        maxWidth: "450px",
        minHeight: "35vh",
        maxHeight: "80vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          border: "1px solid black",
          width: "100%",
          height: "100%",
          borderRadius: "15px",
        }}
        p={1}
        alignItems={"center"}
        paddingBottom={4}
      >
        <Typography textAlign={"center"} pt={2} variant="h4" mb={5}>
          Sign In
        </Typography>
        <Divider flexItem />
        <Stack
          pt={3}
          gap={3}
          mb={3}
          width={"80%"}
          alignItems={"center"}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            variant="outlined"
            label="Enter Email"
            color="primary"
            InputProps={{
              startAdornment: (
                <Icon sx={{ marginRight: "0.8rem" }}>
                  <EmailIcon />
                </Icon>
              ),
            }}
          />
          <TextField
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            label="Enter Password"
            color="primary"
            InputProps={{
              startAdornment: (
                <Icon sx={{ marginRight: "0.8rem" }}>
                  <KeyIcon />
                </Icon>
              ),
            }}
          />
          <Button
            sx={{ mb: 4, width: { xs: "50%", md: "40%" } }}
            variant="contained"
            endIcon={<LoginIcon />}
            type="submit"
          >
            <Typography variant="button">Log in</Typography>
          </Button>
        </Stack>

        <Divider flexItem />
        <Stack mt={3} alignItems={"center"} gap={2}>
          <Typography>Don't have an account?</Typography>
          <Link to={"/register"}>
            <Button variant="outlined">Sign up</Button>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Login;
