// routes/admin.routes.js
import Ticket from "../models/ticket.model.js";

// Get all tickets (admin only)
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("user_id", "username")
      .sort({ created_at: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update ticket status
export const updateTicketStatus = async (req, res) => {
  try {
    const validStatuses = ["open", "in progress", "resolved"];
    const { status } = req.body;

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user_id", "username");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete ticket
export const deleteTicket = async (req, res) => {
  try {
    if (req.user.role !== "admin" || req.user_id !== req.params.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get admin dashboard statistics
export const getStats = async (req, res) => {
  try {
    const [open, inProgress, resolved] = await Promise.all([
      Ticket.countDocuments({ status: "open" }),
      Ticket.countDocuments({ status: "in progress" }),
      Ticket.countDocuments({ status: "resolved" }),
    ]);

    res.json({
      open,
      inProgress,
      resolved,
      closed,
      total: open + inProgress + resolved + closed,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
