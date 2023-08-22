import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPostQuery,
  useUpdatePostMutation,
} from "../Slices/postApiSlices";

const EditPost = () => {
  const { id } = useParams();

  const { post } = useGetPostQuery(undefined, {
    selectFromResult: ({ data }) => ({
      post: data?.posts?.find((post) => post._id === id),
    }),
  });

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const navigate = useNavigate();
  const [updatePost] = useUpdatePostMutation();

  useEffect(() => {
    setContent(post?.content);
    setTitle(post?.title);
    setSummary(post?.summary);
  }, [post?.content, post?.title, post?.summary]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost({
        id: post?._id,
        form: { content, title, summary, file },
      }).unwrap();

      navigate("/");
      toast.success("Updated Successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const fileReader = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFilePreview(reader.result);
        setFile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Box width={"100%"} padding={1}>
      {false ? (
        <Loader />
      ) : (
        <Box
          sx={{
            margin: "5rem auto",
            padding: "1rem",
            maxWidth: "1250px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            border: "1px solid grey",
            borderRadius: "15px",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "1rem",
            }}
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              required
              label={"Title"}
            />
            <TextField
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              type="text"
              required
              label={"Summary"}
            />
            <input
              placeholder="Choose File"
              type={"file"}
              accept="image/*"
              onChange={fileReader}
            />
            <Box width={"300px"} maxHeight={"300px"} overflow={"hidden"}>
              <img
                src={file ? filePreview : post?.imageURL?.url}
                alt={post?.title}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Box minHeight={"20vh"} width={"100%"} height={"100%"}>
              <ReactQuill
                theme={"snow"}
                value={content}
                onChange={setContent}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Button type="submit" variant="contained">
              Update Post
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default EditPost;
