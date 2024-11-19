// src/components/AdminDashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import TicketList from "./TicketList";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/tickets",
          {
            headers: { "x-auth-token": token },
          }
        );
        setTickets(response.data);
        calculateStats(response.data);
      } catch (err) {
        setError("Failed to fetch tickets");
        console.error(err);
      }
    };

    fetchAllTickets();
  }, []);

  const calculateStats = (ticketData) => {
    const stats = ticketData.reduce(
      (acc, ticket) => {
        acc.total++;
        switch(ticket.status) {
          case 'open':
            acc.open++;
            break;
          case 'in progress':
            acc.inProgress++;
            break;
          case 'resolved':
            acc.resolved++;
            break;
        }
        return acc;
      },
      { total: 0, open: 0, inProgress: 0, resolved: 0 }
    );
    setStats(stats);
  };

  const handleTicketUpdate = (updatedTicket) => {
    setTickets(tickets.map(ticket => 
      ticket._id === updatedTicket._id ? updatedTicket : ticket
    ));
    calculateStats(tickets.map(ticket => 
      ticket._id === updatedTicket._id ? updatedTicket : ticket
    ));
  };

  const handleTicketDelete = (deletedId) => {
    setTickets(tickets.filter(ticket => ticket._id !== deletedId));
    calculateStats(tickets.filter(ticket => ticket._id !== deletedId));
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="admin-stats">
        <div className="stat-card total">
          <h3>Total Tickets</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card open">
          <h3>Open</h3>
          <p>{stats.open}</p>
        </div>
        <div className="stat-card in-progress">
          <h3>In Progress</h3>
          <p>{stats.inProgress}</p>
        </div>
        <div className="stat-card resolved">
          <h3>Resolved</h3>
          <p>{stats.resolved}</p>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
      <TicketList 
        tickets={tickets} 
        isAdmin={true} 
        onTicketUpdate={handleTicketUpdate}
        onTicketDelete={handleTicketDelete}
      />
    </div>
  );
};

export default AdminDashboard;
