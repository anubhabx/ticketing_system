/* eslint-disable react/prop-types */
// src/components/DeleteTicket.jsx
import axios from "axios";

const DeleteTicket = ({ ticketId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/tickets/${ticketId}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 200) {
        onDelete(ticketId);
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
      const errorMessage = error.response?.data?.message || "Failed to delete ticket";
      alert(errorMessage);
    }
  };

  return (
    <button
      onClick={() => {
        if (window.confirm("Are you sure you want to delete this ticket?")) {
          handleDelete();
        }
      }}
      className="delete-btn"
    >
      Delete Ticket
    </button>
  );
};

export default DeleteTicket;
