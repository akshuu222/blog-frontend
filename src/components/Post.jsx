import React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={8}
      sx={{
        padding: { xs: "0.5rem 0.5rem 1rem 0.5rem", md: "1rem" },
        border: "1px solid black",
        borderRadius: "15px",
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: "0.8rem", md: "2rem" },
        alignItems: "center",
        minHeight: { xs: "70vh", md: "50vh" },
        maxHeight: { xs: "70vh", md: "50vh" },
        overflow: "hidden",
      }}
    >
      <Box
        flex={0.8}
        width={"100%"}
        height={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        overflow={"hidden"}
      >
        <img
          src={post?.imageURL?.url}
          alt="blog"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>

      <Stack sx={{ flex: 1, gap: { xs: "0.5rem", md: "0.8rem" } }}>
        <Box>
          <Typography
            sx={{
              lineHeight: { xs: "1.2", md: "1.2" },
              fontSize: { xs: "1.65rem", md: "2.2rem" },
            }}
            fontWeight={600}
            gutterBottom
          >
            {post?.title.substring(0, 50)}
          </Typography>
          <Typography gutterBottom lineHeight={1.5} variant="body1">
            {`${post?.summary.substring(
              0,
              window.innerWidth < 480 ? 50 : 400
            )}  ${post?.summary?.length > 400 ? "...." : ""}`}
          </Typography>
        </Box>
        <Stack
          direction={"row"}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
          }}
        >
          <Button
            onClick={() => {
              navigate(`/post/${post._id}`);
            }}
            color={"primary"}
            variant="contained"
          >
            Read More
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Post;
