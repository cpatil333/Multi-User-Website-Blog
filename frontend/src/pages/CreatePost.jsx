import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../apollo/Mutation";
import { useSelector } from "react-redux";

export const userPost = async ({ request }) => {
  try {
    const res = await request.formData();
    const data = Object.fromEntries(res);
  } catch (error) {
    console.log("Error ", error.message);
  }
};
export const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const { user } = useSelector((state) => state.auth);
  const authorId = user?.id;

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    onCompleted: (data) => {
      alert(`✅ Post created: ${data.createPost.title}`);
      setFormData({
        title: "",
        content: "",
      });
    },
  });

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createPost({
        variables: {
          input: {
            title: formData.title,
            content: formData.content,
            authorId: authorId,
          },
        },
      });
    } catch (error) {
      console.error("Post data error ", error.message);
      alert("Post data failed, please check data!");
    }
  };

  return (
    <div className="container">
      <h2>User Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Title Name"
            onChange={handleInput}
          />
        </div>
        <div>
          <textarea
            type="text"
            name="content"
            value={formData.content}
            placeholder="Content"
            onChange={handleInput}
            rows={5}
            cols={45}
          ></textarea>
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
