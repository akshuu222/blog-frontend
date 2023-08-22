import { Box, Stack, Toolbar } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import Post from "./Post";
import { useGetPostQuery } from "../Slices/postApiSlices";
import { toast } from "react-toastify";
import Loader from "./Loader";

const Home = () => {
  const { data, isLoading, isError } = useGetPostQuery();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [isError]);

  return (
    <Box
      maxWidth={"1250px"}
      sx={{ margin: { xs: "1rem auto", md: "2rem auto" } }}
    >
      <Toolbar />
      {isLoading ? (
        <Loader />
      ) : (
        <Stack alignItems={"center"} gap={2} flexWrap={"wrap"} p={2}>
          {data?.posts?.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Home;
