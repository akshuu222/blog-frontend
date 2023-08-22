import { Box, Button, TextField } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreatePostMutation } from "../Slices/postApiSlices";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate()

  const [createPost, { isLoading }] = useCreatePostMutation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
});
  

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newForm = new FormData();
      newForm.set("content", content);
      newForm.set("title", title);
      newForm.set("summary", summary);
      newForm.set("file", file);
      await createPost(newForm).unwrap();
      navigate("/")
      toast.success("success");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <Box width={"100%"} padding={1}>
      {isLoading ? (
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
              required
              type={"file"}
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Box minHeight={"20vh"} width={"100%"} height={"100%"}>
              <ReactQuill
                theme={"snow"}
                value={content}
                onChange={setContent}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Button type="submit" variant="contained">
              Create Post
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default CreatePost;
