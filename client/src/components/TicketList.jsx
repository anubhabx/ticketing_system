/* eslint-disable react/prop-types */
// src/components/TicketList.js
import TicketItem from "./TicketItem";

const TicketList = ({ tickets, isAdmin, onTicketUpdate, onTicketDelete }) => {
  return (
    <div className="ticket-list">
      <h3>Your Tickets</h3>
      {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        tickets.map((ticket) => (
          <TicketItem
            key={ticket._id}
            ticket={ticket}
            isAdmin={isAdmin}
            onUpdate={onTicketUpdate}
            onDelete={onTicketDelete}
          />
        ))
      )}
    </div>
  );
};

export default TicketList;
