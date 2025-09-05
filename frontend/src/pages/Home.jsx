import { useLoaderData, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const userList = useLoaderData();
  console.log(userList);
  const displayUsers = userList.users;

  return (
    <div className="main-container">
      <h2>User List</h2>
      <div>
        <button className="" onClick={() => navigate(`/register`)}>
          New User
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <img
                  src={
                    user.imageUrl
                      ? `http://localhost:4000/uploads/${user.imageUrl}`
                      : `http://localhost:4000/uploads/default-avatar.png`
                  }
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  alt={user.name}
                />
              </td>
              <td>
                <button onClick={() => navigate(`/edit-user/` + user.id)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
