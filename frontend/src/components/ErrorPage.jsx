import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  if (error.status === 400) {
    return (
      <div className="container">
        <h2>404 ErrorPage</h2>
        <button onClick={() => navigate(-1)}></button>
      </div>
    );
  }
};
