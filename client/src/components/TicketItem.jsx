/* eslint-disable react/prop-types */
// src/components/TicketItem.js
import { useState } from "react";
import axios from "axios";
import DeleteTicket from "./DeleteTicket";

const TicketItem = ({ ticket, isAdmin, onUpdate, onDelete }) => {
  const [comment, setComment] = useState("");

  const handleStatusChange = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `http://localhost:5000/api/admin/tickets/${ticket._id}/update-status`,
        { status: newStatus },
        { headers: { "x-auth-token": token } }
      );
      if (onUpdate) {
        onUpdate(res.data);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/tickets/${ticket._id}/comment`,
        { text: comment.trim() },
        { headers: { "x-auth-token": token } }
      );
      if (onUpdate) {
        onUpdate(res.data);
      }
      setComment("");
    } catch (err) {
      console.error("Error adding comment:", err.response?.data || err.message);
      // alert("Failed to add comment. Please try again.");
    }
  };

  return (
    <div className="ticket-item">
      <h4>{ticket.title}</h4>
      <p>{ticket.description}</p>
      <div className="ticket-status">
        Status: {ticket.status}
        {isAdmin && (
          <select
            value={ticket.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        )}
      </div>
      <div className="comments">
        <h5>Comments</h5>
        {ticket.comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p>{comment.text}</p>
            <small>{new Date(comment.created_at).toLocaleString()}</small>
          </div>
        ))}
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
      {isAdmin && <DeleteTicket ticketId={ticket._id} onDelete={onDelete} />}
    </div>
  );
};

export default TicketItem;
