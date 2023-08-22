import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../Slices/userApiSlice";
import { logout } from "../Slices/authSlices";
import { toast } from "react-toastify";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutapi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutapi().unwrap();
      dispatch(logout());
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <AppBar
      sx={{
        padding: { xs: "0", md: "0 3rem" },
        bgcolor: "black",
        color: "white",
      }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Typography component={Link} to={"/"} variant="h4" sx={{ flex: 1 }}>
          My Blog
        </Typography>
        {!userInfo ? (
          <Stack direction={"row"} alignItems={"center"} gap={3}>
            <NavLink to={"/login"}>
              <Typography variant="subtitle1">Login</Typography>
            </NavLink>
            <NavLink to={"/register"}>
              <Typography>Register</Typography>
            </NavLink>
          </Stack>
        ) : (
          <Stack direction={"row"} alignItems={"center"} gap={3}>
            <NavLink to={"/create"}>
              <Typography variant="subtitle1">Create Post</Typography>
            </NavLink>
            <NavLink onClick={handleLogout} to={"/login"}>
              <Typography>Logout</Typography>
            </NavLink>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
