import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../apollo/Mutation";
import { useDispatch } from "react-redux";
import { setCredential } from "../features/auth/authSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [login] = useMutation(USER_LOGIN);

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: {
          input: {
            ...formData,
          },
        },
      });
      console.log(data);
      if (data?.login) {
        dispatch(
          setCredential({
            user: {
              id: data.login.user.id,
              name: data.login.user.name,
              role: data.login.user.role,
            },
            token: data.login.token,
          })
        );
        navigate("/", { replace: true });
      } else {
        console.log("Invalid login credential!");
      }
    } catch (error) {
      console.error("Error Login ", error.message);
      alert("Login failed, Please try again!");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
