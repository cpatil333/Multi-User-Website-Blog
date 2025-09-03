import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const token = localStorage.getItem("token") || null;

  if (!token && path !== "/login" && path !== "register") {
    navigate("/login");
  }
  const handleLogout = () => {
    //dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Multiple User Website</h2>
        {token ? (
          <>
            <li>
              <Link to="/">Users</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/comments">Comments</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </nav>
    </div>
  );
};
