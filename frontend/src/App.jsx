import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { getUsers } from "./API/getUsers";
import { ErrorPage } from "./components/ErrorPage";
import { CreatePost, userPost } from "./pages/CreatePost";
import { CommentForm, userComment } from "./pages/CommentForm";

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
          path: "/create-post",
          element: <CreatePost />,
          action: userPost,
        },
        {
          path: "/comments",
          element: <CommentForm />,
          action: userComment,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
