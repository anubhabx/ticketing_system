/* eslint-disable react/prop-types */
// src/components/TicketManagement.jsx
import { useState } from "react";
import axios from "axios";

const TicketManagement = ({ ticket, onUpdate }) => {
  const [status, setStatus] = useState(ticket.status);
  const [error, setError] = useState("");

  const handleStatusChange = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5000/api/admin/tickets/${ticket._id}/status`,
        { status: newStatus },
        { headers: { "x-auth-token": token } }
      );
      onUpdate(response.data);
      setStatus(newStatus);
    } catch (err) {
      setError("Failed to update ticket status");
      console.error(err);
    }
  };

  return (
    <div className="ticket-management">
      <div className="status-control">
        <label>Status: </label>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="open">Open</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default TicketManagement;
