import React from "react";
import { useNavigate, useLoaderData } from "react-router-dom";

export const CommentPosts = () => {
  const navigate = useNavigate();
  const postList = useLoaderData();
  // console.log(postList);
  const displayPosts = postList.posts;

  return (
    <div className="main-container">
      <h2>Posts List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>
                <button onClick={() => navigate(`/post-details/` + post.id)}>
                  Comment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
