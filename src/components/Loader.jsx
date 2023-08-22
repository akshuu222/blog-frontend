import { CircularProgress, Stack } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Stack
      height={"100vh"}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircularProgress size={"3rem"} />
    </Stack>
  );
};

export default Loader;
