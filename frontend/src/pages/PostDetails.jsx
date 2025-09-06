import React from "react";
import { useLoaderData } from "react-router-dom";
import { CommentForm } from "./CommentForm";

export const PostDetails = () => {
  const postDetails = useLoaderData();
  console.log(postDetails);
  const post = postDetails.post;

  return (
    <div className="container">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="mb-2">{post.content}</p>
      <p className="text-sm text-gray-500">By {post.author.name}</p>

      <h3 className="mt-4 font-semibold">Comments</h3>
      <ul>
        {post.comments.map((c) => (
          <li key={c.id} className="border-b py-1">
            <strong>{c.author.name}:</strong> {c.text}
          </li>
        ))}
      </ul>

      <CommentForm postId={post.id} />
    </div>
  );
};
