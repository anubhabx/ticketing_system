/* eslint-disable react/prop-types */
// src/components/CreateTicket.js
import { useState } from "react";
import axios from "axios";

const CreateTicket = ({ onTicketCreated }) => {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/tickets/create-ticket",
        ticket,
        {
          headers: { "x-auth-token": token },
        }
      );
      onTicketCreated(res.data);
      setTicket({ title: "", description: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Error creating ticket");
    }
  };

  return (
    <div className="create-ticket">
      <h3>Create New Ticket</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Ticket Title"
            value={ticket.title}
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
          />
        </div>
        <div>
          <textarea
            placeholder="Ticket Description"
            value={ticket.description}
            onChange={(e) =>
              setTicket({ ...ticket, description: e.target.value })
            }
          />
        </div>
        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
};

export default CreateTicket;
