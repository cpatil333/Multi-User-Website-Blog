import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { getUsers } from "./API/getUsers";
import { getPosts } from "./API/getPosts";
import { getPost } from "./API/getPost";
import { getCommentPosts } from "./API/getCommentPosts";
import { ErrorPage } from "./components/ErrorPage";
import { CreatePost, userPost } from "./pages/CreatePost";
import { CommentPosts } from "./pages/CommentPosts";
import { PostDetails } from "./pages/PostDetails";
import { Posts } from "./pages/Posts";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: getUsers,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/posts",
          element: <Posts />,
          loader: getPosts,
        },
        {
          path: "/create-post",
          element: <CreatePost />,
          action: userPost,
        },
        {
          path: "/post-details/:id",
          element: <PostDetails />,
          loader: getPost,
        },
        {
          path: "/comments-posts",
          element: <CommentPosts />,
          loader: getCommentPosts,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
