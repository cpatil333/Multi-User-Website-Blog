import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../apollo/Mutation";
import { useSelector } from "react-redux";
import { GET_POST } from "../apollo/Query";

export const userComment = async ({ request }) => {
  try {
    const res = await request.formData();
    const data = Object.fromEntries(res);
  } catch (error) {
    console.log("Error ", error.message);
  }
};

export const CommentForm = ({ postId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    text: "",
  });
  const { user } = useSelector((state) => state.auth);
  const authorId = user?.id;

  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    onCompleted: (data) => {
      alert("Your post is comment");
      setFormData({
        text: "",
      });
    },
    refetchQueries: [{ GET_POST, variables: { postId: postId } }],
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
      const { data } = await createComment({
        variables: {
          input: {
            text: formData.text,
            postId: postId,
            authorId: authorId,
          },
        },
      });
    } catch (error) {
      console.error("Comment data error ", error.message);
      alert("Comment data failed, please check data!");
    }
  };

  return (
    <div className="container">
      <h2>User Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            type="text"
            name="text"
            value={formData.text}
            placeholder="Text"
            onChange={handleInput}
            rows={5}
            cols={45}
          ></textarea>
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Add"}
          </button>
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </div>
      </form>
    </div>
  );
};
