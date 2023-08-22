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
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../Slices/userApiSlice";
import { setCredentials } from "../Slices/authSlices";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(user));
      navigate("/");
      toast.success("Registered Successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <Box
      sx={{
        margin: "6rem auto",
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
          Register
        </Typography>
        <Divider flexItem />
        <Stack
          pt={3}
          gap={3}
          mb={3}
          width={"80%"}
          component={"form"}
          onSubmit={handleSubmit}
          alignItems={"center"}
        >
          <TextField
            fullWidth
            required
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Enter Name"
            color="primary"
            InputProps={{
              startAdornment: (
                <Icon sx={{ marginRight: "0.8rem" }}>
                  <PersonIcon />
                </Icon>
              ),
            }}
          />
          <TextField
            required
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            required
            fullWidth
            variant="outlined"
            label="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <Typography variant="button">Sign up</Typography>
          </Button>
        </Stack>

        <Divider flexItem />
        <Stack mt={3} alignItems={"center"} gap={2}>
          <Typography>Already have an account?</Typography>
          <Link to={"/login"}>
            <Button variant="outlined">Log in</Button>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Register;
