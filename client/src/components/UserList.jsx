// src/components/UserList.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: { "x-auth-token": token },
          }
        );
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      Bangalore. Hello.
      <h3>User Management</h3>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button>View Tickets</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
