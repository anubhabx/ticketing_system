// src/components/Dashboard.js
import { useState, useEffect } from "react";
import axios from "axios";
import TicketList from "./TicketList";
import CreateTicket from "./CreateTicket";
import { checkAdmin } from "../utils/checkAdmin";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  console.log("isAdmin", isAdmin);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/tickets/my-tickets", {
          headers: { "x-auth-token": token },
        });
        setTickets(res.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    setIsAdmin(checkAdmin());
  }, []);

  return (
    <div className="dashboard">
      <h2>
        Dashboard
        {isAdmin && (
          <button
            className="admin-button"
            onClick={() => {
              window.location.href = "/admin";
            }}
          >
            <span>Admin Dashboard</span>
            <span className="admin-indicator">Admin</span>
          </button>
        )}
      </h2>
      
      <div className="dashboard-grid">
        <div className="dashboard-section">
          <CreateTicket
            onTicketCreated={(newTicket) => setTickets([...tickets, newTicket])}
          />
        </div>
        
        <div className="dashboard-section">
          <TicketList
            tickets={tickets}
            isAdmin={isAdmin}
            onTicketUpdate={(updatedTicket) => {
              setTickets(
                tickets.map((t) =>
                  t._id === updatedTicket._id ? updatedTicket : t
                )
              );
            }}
            onTicketDelete={(deletedId) => {
              setTickets(tickets.filter((t) => t._id !== deletedId));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
