import { Avatar, Button, Stack, Typography } from "@mui/material";
import React, { useLayoutEffect } from "react";
import {
  useDeletePostMutation,
  useGetPostQuery,
} from "../Slices/postApiSlices";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "./Loader";

const PostInfo = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { post } = useGetPostQuery(undefined, {
    selectFromResult: ({ data }) => ({
      post: data?.posts?.find((post) => post?._id === id),
    }),
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
});

  const isAuthorAndPostSame = post?.user?._id === userInfo?.user?._id;
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const handleDelete = async () => {
    try {
      await deletePost(post?._id).unwrap();
      navigate("/");
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const text = post?.content;

  return isLoading ? (
    <Loader />
  ) : (
    <Stack
      width={"100vw"}
      padding={0}
      mt={2}
      p={1}
      overflow={"hidden"}
      maxWidth={"100vw"}
    >
      <Stack
        maxWidth={"1000px"}
        sx={{
          margin: { xs: "3.7rem auto", md: "5rem auto" },
          minWidth: { xs: "325px", md: "800px" },
        }}
      >
        <Stack
          width={"100%"}
          direction={"row"}
          alignItems={"center"}
          gap={2}
          sx={{
            padding: { xs: "0 0.5rem", md: "0 4rem" },
            marginBottom: { xs: "1rem", md: "2rem" },
            gap: { xs: "0.5rem", md: "2rem" },
          }}
        >
          <Stack>
            <Avatar sx={{ bgcolor: "black", color: "white" }}>
              {post?.user?.name[0]}
            </Avatar>
          </Stack>
          <Stack flex={1}>
            <Typography fontWeight={600} variant="caption">
              Posted By : {post?.user?.name}
            </Typography>
            <Typography fontWeight={600} variant="caption">
              On : {new Date(post?.user?.createdAt).toDateString()}
            </Typography>
          </Stack>
          {isAuthorAndPostSame && (
            <Stack
              direction={"row"}
              alignItems={"center"}
              sx={{ gap: { xs: "0.5rem", md: "1rem" } }}
            >
              <Button
                onClick={() => navigate(`/edit/${post?._id}`)}
                size={"small"}
                variant={"contained"}
              >
                Edit
              </Button>
              <Button
                size={"small"}
                onClick={handleDelete}
                variant={"outlined"}
              >
                Delete
              </Button>
            </Stack>
          )}
        </Stack>
        <Stack
          width={"100%"}
          sx={{
            height: { xs: "40vh", md: "60vh" },
            maxHeight: { xs: "40vh", md: "60vh" },
          }}
          mb={3}
        >
          <img
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
            src={post?.imageURL?.url}
            alt="posts"
          />
        </Stack>
        <Stack mb={5}>
          <Typography variant="h4">Summary : </Typography>
          <Typography variant="body1" lineHeight={1.8}>
            {post?.summary}
          </Typography>
        </Stack>
        <Stack maxWidth={"100vw"}>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default PostInfo;
